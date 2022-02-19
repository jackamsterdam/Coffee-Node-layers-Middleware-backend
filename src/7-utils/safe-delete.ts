import fs from 'fs'
// change to async 
function safeDelete(fullPath) {
    try {
        if (!fullPath || !fs.existsSync(fullPath)) return 
        

  fs.unlinkSync(fullPath)

    } catch (err: any) {
    
    }


}

export default safeDelete