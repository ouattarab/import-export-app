# ImportExportApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## dependance 
npm install papaparse
npm install -g json-server


## PS merge

CREATE OR REPLACE PROCEDURE MERGE_EMPLOYEES (p_result OUT SYS_REFCURSOR) IS
BEGIN
    -- Fusionner les données de EMPLOYEE vers EMPLOYEECOPY
    MERGE INTO EMPLOYEECOPY EC
    USING EMPLOYEE E
    ON (EC.EMPLOYEE_ID = E.EMPLOYEE_ID)
    WHEN MATCHED THEN
        UPDATE SET 
            EC.FIRST_NAME   = E.FIRST_NAME,
            EC.LAST_NAME    = E.LAST_NAME,
            EC.EMAIL        = E.EMAIL,
            EC.PHONE_NUMBER = E.PHONE_NUMBER,
            EC.HIRE_DATE    = E.HIRE_DATE,
            EC.JOB_ID       = E.JOB_ID,
            EC.SALARY       = E.SALARY;
    
    COMMIT;

    -- Retourner le message de succès dans un curseur
    OPEN p_result FOR
    SELECT '1 Effectué avec succès' AS MESSAGE FROM DUAL;

EXCEPTION
    WHEN OTHERS THEN
        -- En cas d'erreur, on retourne un message d'échec
        ROLLBACK;
        OPEN p_result FOR
        SELECT '0 Échec : ' || SQLERRM AS MESSAGE FROM DUAL;
END MERGE_EMPLOYEES;
/

