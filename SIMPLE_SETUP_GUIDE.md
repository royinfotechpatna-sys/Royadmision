# 🚀 ROY INFOTECH ADMISSION SYSTEM - COMPLETE SETUP GUIDE
## सिर्फ 15 मिनट में पूरा सेटअप करें!

---

## 📌 STEP 1: GOOGLE SHEET BANAO (5 मिनट)

### 1.1 नया Sheet बनाओ
```
1. Google Sheets kholo: https://sheets.google.com
2. क्लिक करो: "+ Blank" (नया sheet)
3. Sheet का नाम रखो: "Roy Infotech Admissions"
```

### 1.2 Headers Add Karo (Copy-Paste करो)
**पहली row (Row 1) में ये headers exactly इसी order में लिखो:**

```
A1: Timestamp
B1: Admission No
C1: Student Name
D1: Father Name
E1: Mother Name
F1: Gender
G1: Date of Birth
H1: Mobile
I1: Course
J1: Course Fee
K1: Address
L1: Student Photo
M1: Payment Slip
N1: Status
```

**TIP:** सभी headers को एक साथ select करो और:
- **Bold** बनाओ
- **Background color** दो (कोई भी रंग)
- ये optional है लेकिन अच्छा दिखेगा

✅ **CHECKPOINT:** आपका sheet ऐसा दिखना चाहिए:
```
| Timestamp | Admission No | Student Name | Father Name | ... |
|-----------|--------------|--------------|-------------|-----|
|           |              |              |             |     |
```

---

## 📌 STEP 2: GOOGLE APPS SCRIPT SETUP (5 मिनट)

### 2.1 Apps Script खोलो
```
1. Google Sheet में ऊपर menu bar में जाओ
2. क्लिक करो: Extensions → Apps Script
3. नया tab खुलेगा "Apps Script Editor"
```

### 2.2 Code Copy-Paste करो
```
1. Apps Script में आपको Code.gs file दिखेगी
2. अगर कोई code लिखा है तो सब DELETE करो
3. अब GoogleAppsScript.js file खोलो जो मैंने दी है
4. उसका पूरा CODE copy करो
5. Code.gs में paste करो
6. CTRL+S दबाकर Save करो
7. Project का नाम पूछेगा: "Roy Infotech API" लिखो
```

### 2.3 Test करो (Optional लेकिन recommended)
```
1. Function dropdown में "testSetup" select करो
2. "Run" button (▶ play button) दबाओ
3. पहली बार permissions मांगेगा - "Allow" दो
4. Execution log में "Test row added successfully!" दिखना चाहिए
5. अपनी Google Sheet check करो - एक test row आया होगा और अपने आप delete हो गया होगा
```

✅ **CHECKPOINT:** अगर test successful रहा तो script सही से काम कर रही है!

---

## 📌 STEP 3: WEB APP DEPLOY KARO (3 मिनट)

### 3.1 Deployment शुरू करो
```
1. Apps Script में ऊपर right corner में "Deploy" button ढूंढो
2. क्लिक करो: Deploy → New deployment
```

### 3.2 Settings Configure करो
```
1. "Select type" के आगे ⚙️ (gear icon) पर क्लिक करो
2. "Web app" select करो
3. अब ये settings भरो:

   📝 Description: Roy Infotech Admission API (optional)
   
   ⚙️ Execute as: Me (your-email@gmail.com)
   
   👥 Who has access: Anyone
   
4. "Deploy" button दबाओ
```

### 3.3 Authorize करो
```
1. "Authorize access" window खुलेगी
2. अपना Google account select करो
3. "Advanced" पर क्लिक करो
4. "Go to Roy Infotech API (unsafe)" पर क्लिक करो
5. "Allow" दबाओ
```

### 3.4 **IMPORTANT:** Web App URL Copy करो
```
Deploy होने के बाद एक URL मिलेगा जैसे:

https://script.google.com/macros/s/AKfycbxXXXXXXXXXXXXXXXXXXXX/exec

⚠️ इस पूरी URL को COPY करके कहीं safe जगह paste कर दो!
   (Notepad में या कहीं भी)
```

✅ **CHECKPOINT:** आपके पास एक लंबी URL होनी चाहिए जो `/exec` से खत्म होती है

---

## 📌 STEP 4: HTML FILE ME URL PASTE KARO (2 मिनट)

### 4.1 HTML File खोलो
```
1. "admission-system-improved.html" file खोलो
2. Notepad या कोई भी text editor में खोलो
```

### 4.2 URL Replace करो
```
1. CTRL+F दबाओ (Find option)
2. Search करो: YOUR_SCRIPT_ID_HERE
3. Line 642 के आसपास ये line मिलेगी:

   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID_HERE/exec';

4. YOUR_SCRIPT_ID_HERE की जगह अपनी पूरी URL paste करो

   Example (आपकी URL अलग होगी):
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxXXXXX.../exec';

5. File को Save करो (CTRL+S)
```

✅ **CHECKPOINT:** URL सही से paste हो गया है

---

## 📌 STEP 5: TEST KARO! (अभी करो!)

### 5.1 HTML File खोलो
```
1. "admission-system-improved.html" file को browser में खोलो
2. Double-click करो या Right-click → Open with → Chrome/Firefox
```

### 5.2 Test Form भरो
```
1. कोई भी sample data भरो:
   - Name: Test Student
   - Father: Test Father
   - Mother: Test Mother
   - Gender: Male select करो
   - DOB: कोई भी date
   - Mobile: 1234567890
   - Course: DCA select करो
   - Fee: 5000
   - Address: Test Address
   
2. Student Photo: कोई भी image upload करो
3. Payment Slip: कोई भी image upload करो
4. "Submit Admission Form" button दबाओ
```

### 5.3 Result Check करो
```
अगर सब सही है तो:

✅ Green message दिखेगा: "Admission Successfully Submitted!"
✅ Receipt generate होगी (photos के साथ)
✅ Google Sheet में नया row add हो जाएगा
✅ Google Drive में 2 folders बन जाएंगे:
   - Roy Infotech Admissions
     ├── Student Photos
     └── Payment Slips
```

### 5.4 Google Sheet में Verify करो
```
1. अपनी Google Sheet खोलो
2. नीचे scroll करो
3. आपको नया admission दिखना चाहिए:
   - Timestamp: अभी का date/time
   - Admission No: RI-2026-0001
   - Student Name: Test Student
   - ... सारी details
   - Student Photo: एक link (click करके देख सकते हो)
   - Payment Slip: एक link (click करके देख सकते हो)
   - Status: Pending
```

---

## 🎉 SETUP COMPLETE!

अगर सब steps सही से follow किए तो आपका system **100% ready** है!

---

## 🔧 CUSTOMIZATION (अपने हिसाब से बदलाव)

### Payment Details Update करो

HTML file में **Line 535-540** के आसपास ये section है:
```html
<p><strong>UPI ID:</strong> royinfotech@paytm</p>
<p><strong>Phone Pay/Google Pay:</strong> 9060180354</p>
<p><strong>Bank Name:</strong> State Bank of India</p>
<p><strong>Account No:</strong> XXXXXXXXXXXX</p>
<p><strong>IFSC Code:</strong> SBIN0XXXXXX</p>
```

अपनी सही details से replace करो।

### QR Code Add करो

**Option 1: Image Upload करो**
```html
Line 520 के आसपास ये section है:
<div class="qr-code">
    <div class="qr-placeholder">
        <!-- YE SECTION REPLACE KARO -->
    </div>
</div>

Replace with:
<div class="qr-code">
    <img src="your-qr-code.jpg" style="width: 100%; height: 100%; object-fit: contain;">
</div>
```

**Option 2: Online QR Code**
अगर QR code online है (Google Drive में):
```html
<img src="https://drive.google.com/uc?id=YOUR_FILE_ID" style="width: 100%; height: 100%;">
```

### Courses Add/Remove करो

HTML file में **Line 478-491** पर courses list है:
```html
<option value="ADCA">ADCA</option>
<option value="DCA">DCA</option>
<!-- नई course add करने के लिए: -->
<option value="Python">Python Programming</option>
```

---

## ❓ COMMON PROBLEMS & SOLUTIONS

### Problem 1: "Data Google Sheet में नहीं आ रहा"
**Solution:**
```
✓ Web App URL सही paste की है check करो
✓ Apps Script में deployment सही से हुई है verify करो
✓ Browser console check करो (F12 दबाओ → Console tab)
✓ Apps Script की execution log check करो:
  Apps Script → Executions (left sidebar)
```

### Problem 2: "Images upload नहीं हो रही"
**Solution:**
```
✓ Image size 5MB से कम होनी चाहिए
✓ JPG/PNG format use करो
✓ Google Drive में space है check करो
```

### Problem 3: "Permission Error आ रहा है"
**Solution:**
```
✓ Apps Script में फिर से authorize करो:
  Deploy → Manage deployments → Edit → Deploy again
✓ Google account में login हो check करो
```

### Problem 4: "Receipt print नहीं हो रहा"
**Solution:**
```
✓ Browser print settings check करो
✓ Print preview में page size: A4 select करो
✓ Margins: Default रखो
```

---

## 📊 GOOGLE SHEET ME DATA MANAGE KAISE KARE

### Status Update करना
```
Google Sheet में column N "Status" है
Direct click करके change कर sakte ho:
- Pending → Approved
- Pending → Rejected
- Approved → Completed
```

### Data Export करना
```
Google Sheet में:
File → Download → Microsoft Excel (.xlsx)
या
File → Download → PDF
```

### Admission Search करना
```
Google Sheet में:
CTRL+F दबाओ → Admission number type करो
```

### Data Backup लेना
```
Regular backup:
File → Make a copy
Ya
File → Download → Excel
```

---

## 🌐 ONLINE DEPLOYMENT (OPTIONAL)

अगर website को online लाना है:

### Option 1: GitHub Pages (FREE)
```
1. GitHub account banao
2. New repository banao
3. HTML file upload करो
4. Settings → Pages → Deploy
```

### Option 2: Netlify (FREE)
```
1. netlify.com pe jao
2. Drag & drop HTML file
3. Instant website ready!
```

### Option 3: Google Drive (Quick & Free)
```
1. HTML file ko Google Drive me upload karo
2. Right-click → Share → Anyone with link
3. File khol kar use karo
(Note: Ye method limited features deta hai)
```

---

## 📞 SUPPORT

Koi problem ho to:
1. Browser console check karo (F12)
2. Apps Script execution logs dekho
3. Google Sheet permissions verify karo

**Institute Details:**
Roy Infotech Computer Education
Pakki Dargah, Bankaghat, Patna, Bihar
Contact: 9060180354

---

## ✅ CHECKLIST

Setup complete karne ke baad ye sab check karo:

- [ ] Google Sheet bana aur headers add kiye
- [ ] Apps Script code paste kiya aur save kiya
- [ ] Web App deploy kiya aur URL copy kiya
- [ ] HTML file me URL paste kiya
- [ ] Test form submit kiya
- [ ] Google Sheet me data aaya
- [ ] Photos Google Drive me save huye
- [ ] Receipt generate hui (images ke saath)
- [ ] Payment details update kiye (optional)
- [ ] QR code add kiya (optional)

Sab ✓ ho gaye? **Congratulations!** 🎉

Aapka Admission Management System **fully ready** hai!

---

**Version:** 2.0 (Improved)
**Last Updated:** February 2026
**Created for:** Roy Infotech Computer Education