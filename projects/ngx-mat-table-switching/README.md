## Description / Installation
This library is used for more convenient interaction with Angular Material tables. There are cases when it is necessary to interact with the table using the keyboard, switch between rows or cells, change data using the keyboard. This library is quite easy to use and easy to configure.

To install - `npm i ngx-mat-table-switching `

Below is a description of the functionality, however if you need to see the use of the finished project, you can refer to the repository - `https://github.com/DaniilRalf/ngx-mat-table-switching`

## Beginning of work
- Must have a functioning Angular project `ng new <project_name>
- Install Angular Material `ng add @angular/material`
- At this stage, we can create a basic table template, you can see an example of creating a table either on the official Angular Material website - `https://material.angular.io/components/table/examples`, or in the repository - `https:/ /github.com/DaniilRalf/ngx-mat-table-switching`
- gdfgdfgsdfgsdfg^\
```shell
import {NgxMatTableSwitchingModule} from "ngx-mat-table-switching";

@NgModule({
declarations: [...],
imports: [
            ...,
            NgxMatTableSwitchingModule
         ],
providers: [...],
bootstrap: [...]
})
export class AppModule { }
```

## Using the functionality
### tag - mat-table
| Attribute name       | Attribute type | Status   | Type data     | Description                                                          |
|----------------------|----------------|----------|---------------|----------------------------------------------------------------------|
| ngxMatTableSwitching | Input          | Required | -             |                                                                      |
| [setType]            | Input          | Required | 'row'\'table' | Specify the type of the element on which we initialize the directive |
| [setTagActive]       | Input          | Required | boolean       | If this attribute is true, table navigation mode is active           |

### tag - mat-row
| Attribute name       | Attribute type | Status     | Type data     | Description                                                                                                                                                                                                                                               |
|----------------------|----------------|------------|---------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ngxMatTableSwitching | Input          | Required   | -             |                                                                                                                                                                                                                                                           |
| [setType]            | Input          | Required   | 'row'\'table' | Specify the type of the element on which we initialize the directive                                                                                                                                                                                      |
| [setIndexRow]        | Input          | Required   | number        | Passing an index for each row                                                                                                                                                                                                                             |
| [setRow]             | Input          | Required   | <mat-row>     | Passing data for each row                                                                                                                                                                                                                                 |
| [setAvailableCell]   | Input          | Required   | string[]      | We pass in an array of strings, values that correspond to the names of the columns we want to navigate through. If we want to move through all the columns, we pass in the array all the names of the columns in the order in which they are in the table |
| (onActiveData)       | Output         | Required   | any           | УWhen the "Enter" key is pressed, a data set is transferred to the component - cell knowledge, cell element, line escaping                                                                                                                                |

In the component in which the library is initialized, namely in the style file, it is necessary to define 2 classes:\
Styling the active row\
`.active-class__switching-row {
... }`\
Styling the active cell\
`.active-class__switching-cell {
... }`


## Additionally
- Works only on "mat-table" tables
- Angular not lower than version 11
- For more information - ralf.danya@mail.ru
