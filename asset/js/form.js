/**
 * Ajax Form Handling
 * @Author: Dirk Persky
 * @Date: 22.01.2020
 * @licence: MIT
 * @param options
 */
$.fn.typo3form = function(options){
    /**
     * Set Configuration Array
     */
    var settings = $.extend({
        next: {
            class_current: 'current left',
            class_new: 'next',
            class_form: 'sending',

            submit: true
        },
        prev: {
            class_current: 'current right',
            class_new: 'prev',
            class_form: 'revert',

            submit: false
        }
    }, options);
    // loop forms
    this.map(function (index, element) {
        var form = $(element),
            submit = form.find('[type="submit"]'),
            backwards = form.find('.btn-group.previous .btn');

        // go backwards
        backwards.on('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            formSubmit(settings.prev);
        });
        // go to next
        form.on('submit', (e) => {
            e.preventDefault();
            formSubmit(settings.next);
        });

        function formSubmit(config) {
            // init values
            var data = form.serialize(),
                params = {};
            // add Submit button value
            if(config.submit) {
                // add Submit
                params[submit.prop('name')] = submit.prop('value');
            }
            // disable Fieldset
            form.find('fieldset').attr('disabled','disabled');
            form.addClass(config.class_form);
            // extend Data
            data += '&' + $.param(params);
            // Perform Request
            var ajax = $.ajax({
                type: 'POST',
                url: form.data('ajaxuri'),
                data : data,
                dataType: 'text',
                encode: true
            });
            // Promise
            ajax.then(function(data){
                var response = jQuery(data);
                // bind event
                form.on('webkitAnimationEnd oanimationend msAnimationEnd animationend', $.proxy(destroy, this));
                // stat animation
                response.addClass(config.class_new);
                // add new HTML After
                jQuery(response).insertAfter(form);
                // set Animation Classes
                form.removeClass(config.class_form).addClass(config.class_current);
                submit.attr('disabled','disabled');
            }, function (error) {
                console.log('error', error);
                form.find('fieldset').removeAttr('disabled','disabled');
                form.removeClass(config.class_form);
            });
        }

        function destroy() {
            //unbind
            form.off('webkitAnimationEnd oanimationend msAnimationEnd animationend');
            // get new Form
            var newform = form.next();
            if(newform.length > 0) {
                setTimeout(() => {
                    //rebing
                    newform.typo3form();
                }, 1000);
                // remove class
                newform.removeClass(settings.prev.class_new);
                newform.removeClass(settings.next.class_new);
            }
            // clean html event
            form.remove();
        }
    });
};

window.Statemanager.attach('t3form', function(){
    jQuery('form[data-ajaxuri]').typo3form();
});
