import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

    const name = 'TestUser389'
    const pass = '^9!jT@y#)SOP'

    const page = {
      username: () => cy.get('input[id="Username"]'),
      password: () => cy.get('input[id="Password"]'),
      submitBtn: () => cy.get('button[type="submit"]'),
      addEmployee: () => cy.get('button[id="add"]'),
      firstName: () => cy.get('id="firstName"'),
      lastName: () => cy.get('id="lastName"'),
      dependants: () => cy.get('id="dependants"'),
      addEmployeeBtn: () => cy.get('id="addEmployee"'),
      edit: () => cy.get('class="fas.fa-edit"'),
      deleteBtn: () => cy.get('class="fas.fa-times"'),
      deleteEmployee: () => cy.get('id="deleteEmployee"')
    };

    Given('an Employer', () => {
      // Login section
      cy.visit('https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Account/Login')
      cy.wait(2000)
      page.username().click().clear().type(name)
      page.password().click().clear().type(pass)
      page.submitBtn().click()
      cy.wait(2000)
    })


    Given('I am on the Benefits Dashboard page', () => {
      cy.url().should('eq', 'https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Benefits')
    })


    When('I select Add Employee', () => {
      page.addEmployee().click()
    })
    
    
    Then('I should be able to enter employee details', () => {
      page.firstName().click().clear().type('Joe')
      page.lastName().click().clear().type('Surf')
      page.dependants().click().clear().type('3')
      page.addEmployeeBtn().click()
    })
    
    
    Then('the employee should save', () => {
      cy.get('td').eq(1).contains('Joe')
    })
    
    
    Then('I should see the employee in the table', () => {
      cy.get('td').eq(2).contains('Surf')
    })
    
    
    Then('the benefit cost calculations are correct', () => {
      cy.get('td').eq(6).contains('96.15')
    })
    

    Given('I am on the Benefits Dashboard page', () => {
      cy.location('href').should('include', '/Prod/Benefits')
    })
    
    
    When('I select the Action Edit', () => {
      page.edit().click()
    })
    
    
    Then('I can edit employee details', () => {
      page.dependants().click().clear().type('7')
      page.addEmployeeBtn().click()
    })
    
    
    Then('the data should change in the table', () => {
      cy.get('td').eq(3).contains('7')
    })
    
    
    When('I click the Action X', () => {
      page.deleteBtn().click()
      page.deleteEmployee().click()
    })
    
    
    Then('the employee should be deleted', () => {
      cy.get('td').contains('No employees found.')
    })


    When('Pushing Employee from API', () => {
      const myHeaders = new Headers();
          myHeaders.append("Authorization", "Basic VGVzdFVzZXIzODk6XjkhalRAeSMpU09Q");
          myHeaders.append("Content-Type", "application/json");

          const raw = JSON.stringify({
            "id": "a5a8fd10-0449-47c6-9ef3-f5d578f2e879",
            "firstName": "Joe",
            "lastName": "Surf",
            "dependants": 3
          });

          const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
          };

          fetch("https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
    })


    When('Updating Employee from API', () => {
      const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Authorization", "Basic VGVzdFVzZXIzODk6XjkhalRAeSMpU09Q");

          const raw = JSON.stringify({
            "id": "a5a8fd10-0449-47c6-9ef3-f5d578f2e879",
            "firstName": "Wanda",
            "lastName": "Jackson",
            "dependants": 7
          });

          const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
          };

          fetch("https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
    })


    When('Removing Employee from API', () => {
      const myHeaders = new Headers();
          myHeaders.append("Authorization", "Basic VGVzdFVzZXIzODk6XjkhalRAeSMpU09Q");

          const requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            redirect: "follow"
          };

          fetch("https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees/a5a8fd10-0449-47c6-9ef3-f5d578f2e879", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
    })
