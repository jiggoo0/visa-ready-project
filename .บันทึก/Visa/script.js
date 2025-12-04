document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Data Source และ QR Code Generation
    const visaData = "DEU/V/NARUMON<<SOOMKAN/AC7762531/25108898898THA/201125/60/080326/T";
    const qrcodeElement = document.getElementById("qrcode-container");
    
    if (typeof QRCode !== 'undefined' && qrcodeElement) {
        new QRCode(qrcodeElement, {
            text: visaData,
            width: 50,
            height: 50,
            colorDark : "#000000",
            colorLight : "#e6f7ff",
            correctLevel : QRCode.CorrectLevel.H
        });
    }

    
    // 2. INTERACTIVE MOCK-3D HOLOGRAM (OVI Effect)
    const hologram = document.querySelector('.hologram-effect');
    if (hologram) {
        hologram.addEventListener('mousemove', function(e) {
            const rect = hologram.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // ปรับค่าการหมุนตามเมาส์
            const moveX = (e.clientX - centerX) / 8; 
            const moveY = (e.clientY - centerY) / 8; 

            // ควบคุมการหมุน 3D (จำลองมุมมอง)
            hologram.style.transform = `
                translate(-50%, -50%) 
                rotateX(${-moveY}deg) 
                rotateY(${moveX}deg)
                scale(1.05)
            `;

            // ควบคุมการเปลี่ยนสี (จำลอง OVI)
            const hue = Math.floor(Math.abs(moveX) * 12 + Math.abs(moveY) * 12);
            hologram.style.filter = `hue-rotate(${hue}deg) sepia(0.3) contrast(1.2) drop-shadow(0 0 3px rgba(255, 255, 200, 0.8))`;

        });
        
        // รีเซ็ตเมื่อเมาส์ออกไป
        hologram.addEventListener('mouseleave', function() {
             hologram.style.transform = 'translate(-50%, -50%) perspective(100px) rotateY(10deg)';
             hologram.style.filter = 'sepia(0.3) contrast(1.2) drop-shadow(0 0 3px rgba(255, 255, 200, 0.8))';
        });
    }
    
    // 3. MRZ Checksum Placeholder (เพื่อแสดงศักยภาพ JS)
    // *หากคุณต้องการให้ MRZ line 2 ถูกต้องตามโครงสร้างจริง ควรใช้ JS เพื่อจัดเรียงและใส่ Checksum*
    
});
