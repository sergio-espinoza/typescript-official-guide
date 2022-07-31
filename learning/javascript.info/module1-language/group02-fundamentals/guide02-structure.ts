// 1.a Error statement without ;
  // Cannot read property '2' of undefine
  // >> alert('There will be an error')
  // >> [1, 2].forEach(alert);

// 1.b
  alert("All fine now");
  [1, 2].forEach(alert),

/* so, because the semicolong is not auto-inserted, the code in the first example is treated as a single statement. Here's how the engine sees it:
alert("There will be an error")[1, 2].forEach(alert)

*/



//2 Nested comment are not supported!

/*
  /* nested comment ?!? */
alert( 'World' );

// Manda el error SyntaxError: Unexpected token '*'
