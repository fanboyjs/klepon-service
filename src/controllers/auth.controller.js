import jwt from 'jsonwebtoken';

const tokenBlackList = new Set();

export const login = async (req, res)=>{
    try {
        const {username, password} = req.body;

        //validasi input
        if(!username || !password){
            return res.status(400).json({
                success: false,
                message: 'Username dan password harus diisi'
            });
        }

        //verifikasi credentials
        if(username !== 'admin' || password !== 'admin123'){
            return res.status(401).json({
                success: false,
                message: 'Username atau password salah'
            })
        }

        //generate token
        const token = jwt.sign(
            {
                username: 'admin',
                role: 'admin'
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h'}
        );

        console.log(tokenBlackList)

        return res.status(200).json({
            success: true,
            message: "Login Berhasil",
            data: {
                token,
                username: 'admin',
                role: 'admin'
            }
        });
    } catch (error) {
        console.log('Login error:', error);
        return res.status(500).json({
            success: false,
            message: 'Terjadi Kesalahan server'
        });
    }
}

export const logout = async(req,res)=>{
    try {
        // console.log('Header: ', req.headers);
        
        const token = req.headers.authorization?.split(' ')[1];

        // console.log('Token extracted: ', token);
        // console.log('Token length: ', token?.length);
        
        
        if(!token){
            return res.status(400).json({
                success: false,
                message: 'Token tidak ditemukan'
            });
        }

        //tambah token ke blacklist
        tokenBlackList.add(token);
        // console.log('Token addedd to blacklist')

        return res.status(200).json({
            success: true,
            message: 'Logout Berhasil'
        });
    } catch (error) {
        console.log('Logout error.', error);
        return res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan Server'
        });
    }
}

export const verifyToken = (req, res, next) => {
    try {
        console.log('=== Verify Token Start ===');
        console.log('Headers:', req.headers);
        
        const authHeader = req.headers.authorization; // ← headers (plural)

        if(!authHeader || !authHeader.startsWith('Bearer ')){ // ← startsWith (huruf S)
            console.log('Header tidak valid');
            return res.status(401).json({
                success: false,
                message: 'Token tidak valid atau tidak ada'
            });
        }

        const token = authHeader.split(' ')[1];
        console.log('Token extracted:', token);

        // Cek apakah token ada di blacklist
        if(tokenBlackList.has(token)){
            console.log('Token in blacklist');
            return res.status(401).json({
                success: false,
                message: "Token sudah tidak valid (Logout)"
            });
        }

        // Verifikasi token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // ← process.env.JWT_SECRET
        console.log('Token verified:', decoded);
        
        req.user = decoded;
        next();
        
    } catch (error) {
        console.log('Verify token error:', error.message);
        
        if (error.name === 'TokenExpiredError'){
            return res.status(401).json({
                success: false,
                message: 'Token sudah kadaluarsa'
            });
        }

        return res.status(401).json({
            success: false,
            message: 'Token tidak valid'
        });
    }
}
