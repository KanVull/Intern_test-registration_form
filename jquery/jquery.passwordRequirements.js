/*
 * jQuery Minimun Password Requirements 1.1
 * http://elationbase.com
 * Copyright 2014, elationbase
 * Check Minimun Password Requirements
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/
  
  
(function($){
    $.fn.extend({
        passwordRequirements: function(options) {

            // options for the plugin
            var defaults = {
				numCharacters: 8,
				useLowercase: true,
				useUppercase: true,
				useNumbers: true,
				useSpecial: true,
				infoMessage: '',
				style: "light", // Style Options light or dark
				fadeTime:300 // FadeIn / FadeOut in milliseconds
            };

            options =  $.extend(defaults, options);

            return this.each(function() {
				
				var o = options;
				
                o.infoMessage = 'The minimum password length is ' + o.numCharacters + ' characters and must contain at least 1 lowercase letter, 1 capital letter, 1 number, and 1 special character.';
				// Add Variables for the li elements
				var numCharactersUI = '<li class="pr-numCharacters"><span></span>' + o.numCharacters + ' characters</li>',
					useLowercaseUI = '',
					useUppercaseUI = '',
					useNumbersUI   = '',
					useSpecialUI   = '';
				// Check if the options are checked
				if (o.useLowercase === true) {
					useLowercaseUI = '<li class="pr-useLowercase"><span></span>Lowercase letter</li>';
				}
				if (o.useUppercase === true) {
					useUppercaseUI = '<li class="pr-useUppercase"><span></span>Capital letter</li>';
				}
				if (o.useNumbers === true) {
					useNumbersUI = '<li class="pr-useNumbers"><span></span>Number</li>';
				}
				if (o.useSpecial === true) {
					useSpecialUI = '<li class="pr-useSpecial"><span></span>Special character</li>';
				}
				
				// Append password hint div
				var messageDiv = '<div id="pr-box"><i></i><div id="pr-box-inner"><p>' + o.infoMessage + '</p><ul>' + numCharactersUI + useLowercaseUI + useUppercaseUI + useNumbersUI + useSpecialUI + '</ul></div></div>';
				
				// Set campletion vatiables
				var numCharactersDone = true,
					useLowercaseDone = true,
					useUppercaseDone = true,
					useNumbersDone   = true,
					useSpecialDone   = true;
                
				// Show Message reusable function 
				var showMessage = function () {
					if (numCharactersDone === false || useLowercaseDone === false || useUppercaseDone === false || useNumbersDone === false || useSpecialDone === false) {
						$(".pr-password").each(function() {
							// Find the position of element
							var posH = $(this).offset().top,
								itemH = $(this).innerHeight(),
								totalH = posH+itemH,
								itemL = $(this).offset().left;
							// Append info box tho the body
							$("body")     .append(messageDiv);
							$("#pr-box")  .addClass(o.style)
										  .fadeIn(o.fadeTime)
										  .css({top:totalH, left:itemL});
						});
					}
				};
				
				// Show password hint 
				$(this).on("focus",function (){
					showMessage();
				});
				
				// Delete Message reusable function 
				var deleteMessage = function () {
					var targetMessage = $("#pr-box");
					targetMessage.fadeOut(o.fadeTime, function(){
						$(this).remove();
					});
				};
				
				// Show / Delete Message when completed requirements function 
				var checkCompleted = function () {
					if (numCharactersDone === true && useLowercaseDone === true && useUppercaseDone === true && useNumbersDone === true && useSpecialDone === true) {
						deleteMessage();
					} else {
						showMessage();
					}
				};
				
				// Show password hint 
				$(this).on("blur",function (){
					deleteMessage();
				});
				
				
				// Show or Hide password hint based on user's event
				// Set variables
				var lowerCase   		= new RegExp('[a-z]'),
					upperCase   		= new RegExp('[A-Z]'),
					numbers     		= new RegExp('[0-9]'),
					specialCharacter     = new RegExp('[!,%,&,@,#,$,^,*,?,_,~]');
				
				// Show or Hide password hint based on keyup
				$(this).on("keyup focus", function (){
					var thisVal = $(this).val();  
					
					checkCompleted();
					
					// Check # of characters
					if ( thisVal.length >= o.numCharacters ) {
						$(".pr-numCharacters span").addClass("pr-ok");
						numCharactersDone = true;
					} else {
						$(".pr-numCharacters span").removeClass("pr-ok");
						numCharactersDone = false;
					}
					// lowerCase meet requirements
					if (o.useLowercase === true) {
						if ( thisVal.match(lowerCase) ) {
							$(".pr-useLowercase span").addClass("pr-ok");
							useLowercaseDone = true;
						} else {
							$(".pr-useLowercase span").removeClass("pr-ok");
							useLowercaseDone = false;
						}
					}
					// upperCase meet requirements
					if (o.useUppercase === true) {
						if ( thisVal.match(upperCase) ) {
							$(".pr-useUppercase span").addClass("pr-ok");
							useUppercaseDone = true;
						} else {
							$(".pr-useUppercase span").removeClass("pr-ok");
							useUppercaseDone = false;
						}
					}
					// upperCase meet requirements
					if (o.useNumbers === true) {
						if ( thisVal.match(numbers) ) {
							$(".pr-useNumbers span").addClass("pr-ok");
							useNumbersDone = true;
						} else {
							$(".pr-useNumbers span").removeClass("pr-ok");
							useNumbersDone = false;
						}
					}
					// upperCase meet requirements
					if (o.useSpecial === true) {
						if ( thisVal.match(specialCharacter) ) {
							$(".pr-useSpecial span").addClass("pr-ok");
							useSpecialDone = true;
						} else {
							$(".pr-useSpecial span").removeClass("pr-ok");
							useSpecialDone = false;
						}
					}
				});
            });
        }
    });
})(jQuery);
