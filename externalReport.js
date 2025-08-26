const fs = require('fs');
const xml2js = require('xml2js');

const parser = new xml2js.Parser();

// Report Meta Info
const reportTitle = "PetClinic Test Automation Report";
const environment = "QA-Staging";
const version = "v1.0.0";

// Timestamp
const now = new Date();
const timestamp = now.toLocaleString();

fs.readFile('reports/results.xml', (err, data) => {
  if (err) throw err;

  parser.parseString(data, (err, result) => {
    if (err) throw err;

    // Handle both <testsuites> and <testsuite> root cases
    const testSuites = result.testsuites
      ? result.testsuites.testsuite
      : [result.testsuite];

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
        .skipped {color: #d19e06ff ; font-weight: bold;}
</style>
</head>
<body>
<h1>${reportTitle}</h1>
<div class="meta">
        Environment: ${environment} | Version: ${version} | Generated: ${timestamp}
</div>
<table>
<tr>
<th>Test Scenario ID</th>
<th>Test Case ID</th>
<th>Test Case Type</th>
<th>Description</th>
<th>Date & Time</th>
<th>Status</th>
</tr>`;

    testSuites.forEach(suite => {
      if (!suite.testcase) return; // skip if no testcases

      suite.testcase.forEach(tc => {
        const fullName = tc.$.name || "Unknown";
        const parts = fullName.split("›").map(p => p.trim());

        // Scenario ID part
        const scenarioId = parts[0] || "";

        // Extract test case part
        const testCasePart = parts[1] || "";

        // Split into ID and description
        const [testId, description = "No description"] = testCasePart.split(" - ").map(p => p.trim());

        const combinedID_TestcaseID = `${scenarioId.split(" - ")[0]}_${testId}`;


        let status = "Pass";
        if (tc.skipped) {
          status = "Skipped";
        } else if (tc.failure) {
          status = "Fail";
        }


        // Assign type dynamically (example: smoke for login tests)
        let type = "Functional";
        if (description.toLowerCase().includes("login")) type = "Smoke";

        html += `
            <tr>
            <td>${scenarioId}</td>
            <td>${combinedID_TestcaseID}</td>
            <td>${type}</td>
            <td>${description}</td>
            <td>${timestamp}</td>
            <td class="${status.toLowerCase()}">${status}</td>
            </tr>`;
      });
    });

    html += `</table></body></html>`;

    fs.writeFileSync("reports/report.html", html);
    console.log("✅ UI Report generated: reports/report.html");
  });
});