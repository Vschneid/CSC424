# CSC424
Securing a web application


Instructions:<br/>
      From root directory, use the command "npm start". This will concurrently run the backend API and the frontend build
      as configured in my package.json files.<br/>
  <br/>
      All dependencies should be automatically installed upon running, as I saved when installing, adding these to my
      package.json file as well.<br/>
  <br/>
 Vulnerabilities Found:<br/>
      I was pushing my node_modules directory with my project code, this flagged some vulnerabilites in which secret
      access keys were visible in plaintext. These vunerabilities were flagged as exposed hardcoded secrets, I was able
      to do a simple fix by including this directory in my .gitignore file.<br/>
      A vulnerability was also found in my password validation code, I was calling password.length to set the upperlimit
      on my for loop to check various characters in my password. This password.length field was vulnerable to manual manipulation
      in which an adversary could directly set this field to an astronomical value, causing my loop to run "forever" and trigger a
      denial of service attack. I fixed this vulnerability as advised by SYNK to ensure that password is an existing array, created and
      used within my code. I was able to alter the code before the for loop to ensure that password was an array of characters, thus
      avoiding manual manipulation by an adversary.
      
