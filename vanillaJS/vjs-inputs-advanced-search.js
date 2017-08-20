const SearchAdvanced = {

    clearInputs(scope) {
        const textInputs = scope.querySelectorAll('.form__input > input');
        for(let i = 0; i < textInputs.length; i++) {
            textInputs[i].value = '';
        }
    },

    /* selectric plugin hacking */
    clearSelectrix(scope) {
        const selectBoxes = scope.querySelectorAll('.selectric-wrapper');
        $(scope).find(':input').val('');

        for(let i = 0; i < selectBoxes.length; i++) {
            const label = selectBoxes[i].querySelector('.label');
            const selected = selectBoxes[i].querySelector('.selectric-items').querySelectorAll('li');
            label.textContent = '-vyberte-';
            for(let i = 0; i < selected.length; i++) {selected[i].classList.remove('selected');}
        }
    },

    clearValidationMessages(scope) {
        const validationMessages = scope.querySelectorAll('.field-validation-error');
        if(!validationMessages) return;
        for (let i = 0; i < validationMessages.length; i++) {
            validationMessages[i].classList.add('field-validation-valid');
            validationMessages[i].classList.remove('field-validation-error');
            validationMessages[i].textContent = '';
        }
    },
    clearAll(scope) {
        this.clearInputs(scope);
        this.clearSelectrix(scope);
        this.clearValidationMessages(scope);
    },

    closeOptions(scope) {
        $(scope).find('select').selectric('close');
    },

    init() {
        const clearButton = document.getElementById('searchAdvancedFormClear');
        if(!clearButton) return;
        const scope = document.getElementById('fulltext__advanced');

        clearButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.clearAll(scope);
        });

        document.addEventListener('keydown', (e) => {
            if(e.keyCode === 9) {
                this.closeOptions(scope);
            }
        })
    },
};

SearchAdvanced.init();
