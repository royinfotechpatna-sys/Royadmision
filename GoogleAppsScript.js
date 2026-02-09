// ============================================================================
// ROY INFOTECH COMPUTER EDUCATION - GOOGLE APPS SCRIPT
// ============================================================================
// YE CODE GOOGLE APPS SCRIPT ME PASTE KARNA HAI
// Step-by-step instructions niche diye gaye hain
// ============================================================================

/**
 * STEP 1: Google Sheet Banana
 * ----------------------------
 * 1. Google Sheets kholo: https://sheets.google.com
 * 2. Naya blank sheet banao
 * 3. Sheet ka naam rakho: "Roy Infotech Admissions"
 * 4. Pehli row (Row 1) me ye headers likho:
 * 
 *    A1: Timestamp
 *    B1: Admission No
 *    C1: Student Name
 *    D1: Father Name
 *    E1: Mother Name
 *    F1: Gender
 *    G1: Date of Birth
 *    H1: Mobile
 *    I1: Course
 *    J1: Course Fee
 *    K1: Address
 *    L1: Student Photo
 *    M1: Payment Slip
 *    N1: Status
 * 
 * STEP 2: Apps Script Setup
 * --------------------------
 * 1. Google Sheet me, menu se: Extensions → Apps Script
 * 2. Code.gs file me ye PURA CODE copy-paste karo
 * 3. Save karo (Ctrl+S)
 * 
 * STEP 3: Deploy Karo
 * -------------------
 * 1. "Deploy" button click karo (upar right corner me)
 * 2. "New deployment" select karo
 * 3. Settings:
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. "Deploy" click karo
 * 5. Permissions de do (Authorize karo)
 * 6. Web app URL COPY karo - ye URL aisa dikhega:
 *    https://script.google.com/macros/s/AKfycby.../exec
 * 
 * STEP 4: HTML File Me URL Add Karo
 * ----------------------------------
 * HTML file kholo aur line 642 pe:
 * const GOOGLE_SCRIPT_URL = 'YAHAN_APNA_URL_PASTE_KARO';
 */

// ============================================================================
// MAIN CODE - YE NICHE KA SARA CODE COPY KARO
// ============================================================================

function doPost(e) {
  try {
    Logger.log('Request received');
    
    // Parse incoming data
    var data = JSON.parse(e.postData.contents);
    Logger.log('Data parsed: ' + JSON.stringify(data));
    
    // Get active spreadsheet and sheet
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();
    
    // If sheet is empty, add headers
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Admission No',
        'Student Name',
        'Father Name',
        'Mother Name',
        'Gender',
        'Date of Birth',
        'Mobile',
        'Course',
        'Course Fee',
        'Address',
        'Student Photo',
        'Payment Slip',
        'Status'
      ]);
      
      // Format header row
      var headerRange = sheet.getRange(1, 1, 1, 14);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#1a472a');
      headerRange.setFontColor('#ffffff');
    }
    
    // Create folder in Google Drive for images if doesn't exist
    var mainFolderName = 'Roy Infotech Admissions';
    var mainFolder = getOrCreateFolder(mainFolderName);
    
    // Process student photo
    var studentPhotoLink = '';
    if (data.studentPhoto && data.studentPhoto.length > 100) {
      try {
        var photoFolder = getOrCreateFolder('Student Photos', mainFolder);
        studentPhotoLink = saveBase64Image(
          data.studentPhoto, 
          data.admissionNo + '_photo', 
          photoFolder
        );
        Logger.log('Student photo saved: ' + studentPhotoLink);
      } catch (photoError) {
        Logger.log('Photo error: ' + photoError);
        studentPhotoLink = 'Error uploading photo';
      }
    }
    
    // Process payment slip
    var paymentSlipLink = '';
    if (data.paymentSlip && data.paymentSlip.length > 100) {
      try {
        var slipFolder = getOrCreateFolder('Payment Slips', mainFolder);
        paymentSlipLink = saveBase64Image(
          data.paymentSlip, 
          data.admissionNo + '_payment', 
          slipFolder
        );
        Logger.log('Payment slip saved: ' + paymentSlipLink);
      } catch (slipError) {
        Logger.log('Slip error: ' + slipError);
        paymentSlipLink = 'Error uploading slip';
      }
    }
    
    // Add row to sheet
    sheet.appendRow([
      data.timestamp || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      data.admissionNo,
      data.studentName,
      data.fatherName,
      data.motherName,
      data.gender,
      data.dob,
      data.mobile,
      data.course,
      data.courseFee,
      data.address,
      studentPhotoLink,
      paymentSlipLink,
      'Pending'
    ]);
    
    Logger.log('Row added successfully');
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, 14);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Admission submitted successfully',
      admissionNo: data.admissionNo
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('ERROR: ' + error.toString());
    Logger.log('Stack: ' + error.stack);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Get or create folder in Google Drive
 */
function getOrCreateFolder(folderName, parentFolder) {
  var folders;
  
  if (parentFolder) {
    folders = parentFolder.getFoldersByName(folderName);
  } else {
    folders = DriveApp.getFoldersByName(folderName);
  }
  
  if (folders.hasNext()) {
    return folders.next();
  } else {
    if (parentFolder) {
      return parentFolder.createFolder(folderName);
    } else {
      return DriveApp.createFolder(folderName);
    }
  }
}

/**
 * Save base64 image to Google Drive
 */
function saveBase64Image(base64Data, fileName, folder) {
  try {
    // Remove data URL prefix (data:image/png;base64,)
    var base64String = base64Data.split(',')[1];
    
    if (!base64String) {
      throw new Error('Invalid base64 data');
    }
    
    // Decode base64
    var blob = Utilities.newBlob(
      Utilities.base64Decode(base64String), 
      'image/jpeg', 
      fileName + '.jpg'
    );
    
    // Upload to Drive
    var file = folder.createFile(blob);
    
    // Make file accessible
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    // Return viewable link
    return file.getUrl();
    
  } catch (error) {
    Logger.log('Image save error: ' + error.toString());
    throw error;
  }
}

/**
 * GET request handler - Search admission by number
 */
function doGet(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // If admission number provided, search for it
    if (e.parameter.admissionNo) {
      var admissionNo = e.parameter.admissionNo;
      var data = sheet.getDataRange().getValues();
      
      for (var i = 1; i < data.length; i++) {
        if (data[i][1] == admissionNo) { // Column B is admission number
          return ContentService.createTextOutput(JSON.stringify({
            status: 'success',
            data: {
              timestamp: data[i][0],
              admissionNo: data[i][1],
              studentName: data[i][2],
              fatherName: data[i][3],
              motherName: data[i][4],
              gender: data[i][5],
              dob: data[i][6],
              mobile: data[i][7],
              course: data[i][8],
              courseFee: data[i][9],
              address: data[i][10],
              studentPhoto: data[i][11],
              paymentSlip: data[i][12],
              status: data[i][13]
            }
          })).setMimeType(ContentService.MimeType.JSON);
        }
      }
      
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Admission number not found'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Return all records summary
    var data = sheet.getDataRange().getValues();
    var records = [];
    
    for (var i = 1; i < data.length; i++) {
      records.push({
        timestamp: data[i][0],
        admissionNo: data[i][1],
        studentName: data[i][2],
        course: data[i][8],
        status: data[i][13]
      });
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      count: records.length,
      records: records
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Update admission status
 * Usage: updateStatus('RI-2026-0001', 'Approved')
 */
function updateStatus(admissionNo, newStatus) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  
  for (var i = 1; i < data.length; i++) {
    if (data[i][1] == admissionNo) {
      sheet.getRange(i + 1, 14).setValue(newStatus);
      Logger.log('Status updated for ' + admissionNo + ' to ' + newStatus);
      return true;
    }
  }
  
  Logger.log('Admission number not found: ' + admissionNo);
  return false;
}

/**
 * Send email notification (optional)
 * Usage: sendEmailNotification('RI-2026-0001')
 */
function sendEmailNotification(admissionNo) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  
  for (var i = 1; i < data.length; i++) {
    if (data[i][1] == admissionNo) {
      var studentName = data[i][2];
      var email = 'your-email@gmail.com'; // Change this
      
      var subject = 'Admission Confirmation - Roy Infotech';
      var body = 'Dear ' + studentName + ',\n\n' +
                 'Your admission has been confirmed!\n' +
                 'Admission Number: ' + admissionNo + '\n\n' +
                 'Thank you,\nRoy Infotech Computer Education';
      
      MailApp.sendEmail(email, subject, body);
      return true;
    }
  }
  
  return false;
}

/**
 * Test function - Run this to check if everything is working
 */
function testSetup() {
  Logger.log('Testing setup...');
  
  var testData = {
    timestamp: new Date().toLocaleString(),
    admissionNo: 'TEST-001',
    studentName: 'Test Student',
    fatherName: 'Test Father',
    motherName: 'Test Mother',
    gender: 'Male',
    dob: '2000-01-01',
    mobile: '1234567890',
    course: 'DCA',
    courseFee: '5000',
    address: 'Test Address',
    studentPhoto: '',
    paymentSlip: ''
  };
  
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  sheet.appendRow([
    testData.timestamp,
    testData.admissionNo,
    testData.studentName,
    testData.fatherName,
    testData.motherName,
    testData.gender,
    testData.dob,
    testData.mobile,
    testData.course,
    testData.courseFee,
    testData.address,
    testData.studentPhoto,
    testData.paymentSlip,
    'Test'
  ]);
  
  Logger.log('Test row added successfully!');
  Logger.log('Check your Google Sheet - you should see a new row');
  
  // Delete test row
  var lastRow = sheet.getLastRow();
  sheet.deleteRow(lastRow);
  Logger.log('Test row deleted');
}

// ============================================================================
// INSTALLATION COMPLETE!
// ============================================================================
// Ab Deploy karo aur URL copy karke HTML file me paste karo
// ============================================================================