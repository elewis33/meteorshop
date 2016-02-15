Template.registerHelper('currency', function(num){
  return '$' + Number(num).toFixed(2);
});

Template.registerHelper('percentage', function(num){
  return Number(num *100).toFixed(2) + '%';
});





