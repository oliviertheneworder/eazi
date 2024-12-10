// if #homeCareers has any child with .w-dyn-empty then hide #homeCareers
if ($('#homeCareers').children('.w-dyn-empty').length > 0) {
    $('#homeCareers').hide();
    console.log('Home Careers section hidden');
}

console.log('General JS file loaded');