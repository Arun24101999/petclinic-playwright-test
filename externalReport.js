const fs = require('fs');
const xml2js = require('xml2js');
 
const parser = new xml2js.Parser();
 
// Report Meta Info
const reportTitle = "Playwright Automation Report";
const environment = "QA";
const version = "v1.0.0";
 
// Timestamp
const now = new Date();
const timestamp = now.toLocaleString();
 
fs.readFile('reports/results.xml', (err, data) => {
  if (err) throw err;
 
  parser.parseString(data, (err, result) => {
    if (err) throw err;
 
    const testSuites = result.testsuites.testsuite;
 
    let html = `
    <html>
    <head>
      <title>${reportTitle}</title>
      <style>
        body { font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px; }
        h1 { text-align: center; margin-bottom: 5px; }
        .meta { text-align: center; font-size: 14px; margin-bottom: 20px; color: #444; }
        table { width: 100%; border-collapse: collapse; background: #fff; }
        th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
        th { background: #333; color: white; }
        .pass { color: green; font-weight: bold; }
        .fail { color: red; font-weight: bold; }
      </style>
    </head>
    <body>
      <h1>${reportTitle}</h1>
      <div class="meta">
        Environment: ${environment} | Version: ${version} | Generated: ${timestamp}
      </div>
      <table>
        <tr>
          <th>Test Case ID</th>
          <th>Date & Time</th>
          <th>Test Case Type</th>
          <th>Description</th>
          <th>Status</th>
        </tr>`;
 
    testSuites.forEach(suite => {
      suite.testcase.forEach(tc => {
        const fullName = tc.$.name;   // "TC_Login_001 - Login with valid credentials"
 
        // Split into ID and Description
        const [testId, description] = fullName.split(" - ");
 
        const status = tc.failure ? "Fail" : "Pass";
 
        // You can assign type dynamically (example: smoke for login tests)
        let type = "Functional";
        if (description.includes("login")) type = "Smoke";
 
        html += `
        <tr>
          <td>${testId}</td>
          <td>${timestamp}</td>
          <td>${type}</td>
          <td>${description}</td>
          <td class="${status.toLowerCase()}">${status}</td>
        </tr>`;
      });
    });
 
    html += `</table></body></html>`;
 
    fs.writeFileSync("reports/report.html", html);
    console.log("✅ UI Report generated: reports/report.html");
  });
});