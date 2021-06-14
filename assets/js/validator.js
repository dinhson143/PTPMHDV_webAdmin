function Validator(options  ){

    var selectorRule = {};
    var formElement = document.querySelector(options.form);


    formElement.onsubmit = function(e){
        e.preventDefault();

        var isFormValid = true;
        options.rules.forEach(function(rule){
            var inputElement = formElement.querySelector(rule.selector);
            var isValid = validate(rule,inputElement);
            if(!isValid){
                isFormValid = false;
            }
        });


        


        if(isFormValid){
            if(typeof options.onSubmit === 'function'){

                var enableInput = formElement.querySelectorAll('[name]:not([disabled])');
        
                var formValues = Array.from(enableInput).reduce(function(values,input){
                    return (values[input.name] = input.value) && values;
                },{});

                options.onSubmit(formValues);
            }
        }
    }

    // xử lí blur ra khỏi input
    function validate(rule,inputElement){
        var errorElement = inputElement.parentElement.querySelector('.form-message');
        var errorMessage;

        // lấy ra các rule của 1 selector
        var rules = selectorRule[rule.selector];
        // console.log(rules);
        for (var i = 0; i < rules.length;i++){
            errorMessage = rules[i](inputElement.value);
            if(errorMessage){
                break;
            }
        }

        if(errorMessage){
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add("invalid");
        }
        else{
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove("invalid")
        }
        return !errorMessage;
    }
    // xử lí khi người dùng nhập vào input
    function validate2(inputElement){
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
        errorElement.innerText = '';
        inputElement.parentElement.classList.remove("invalid")
    }
    if(formElement){
        options.rules.forEach(function(rule){

            if(Array.isArray(selectorRule[rule.selector])){
                selectorRule[rule.selector].push(rule.test);
            }
            else{
                selectorRule[rule.selector] = [rule.test];
            }


            var inputElement = formElement.querySelector(rule.selector);

            // blur ra khỏi input
            if(inputElement){
                inputElement.onblur = function(){
                    validate(rule,inputElement);
                }
            }
            // khi người dùng nhập vào input
            inputElement.oninput = function(){
                validate2(inputElement);
            }
        })
    }
}


// Định nghĩa
Validator.isRequired = function(selector,message){
    return {
        selector: selector,
        test: function(value){
            return value.trim() ? undefined : message||'Vui lòng nhập trường này';
        }
    }
}

Validator.isEmail = function(selector,message){
    return {
        selector: selector,
        test: function(value){
            var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            return regex.test(value) ? undefined : message||'Trường này phải là email';
        }
    }
}



Validator.isConfirmPass = function(selector,getConfirmValue,message){
    return {
        selector: selector,
        test: function(value){
            return value === getConfirmValue() ? undefined : message||'Vui lòng nhập trường này';
        }
    }
}