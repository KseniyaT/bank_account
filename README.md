__Description__

User opens up registration route, which consists of 2 “Steps”. On the first visible step the user is asked to fill out personal data, before display of second step. Frontend validation is performed and second step is displayed only if data on first step is valid. Personal data may not contain numbers or special characters. On second step user can see bank account data fields and a “add” button which create extra pairs of bank account fields. Bank account data is validated according to normal IBAN and BIC rules. When user filled out everything correctly and pressed “save” button he is transferred to “Success” view.

__Instruction__

Open app/views/registration/new.html in your brower.
