
---

# Capitolul 8: Funcții în JavaScript (Declarations, Expressions, Callbacks, Arrow Functions)

### 1. Ce au în comun (Numitorul comun)
* **Blocuri de construcție ale codului & Eliminarea duplicării**: Funcțiile sunt elementele principale de construcție ale unui program, concepute pentru a evita duplicarea codului.
* **Funcția este o valoare („Action Value”)**: În JavaScript, o funcție nu este o structură magică, ci o valoare specială ce reprezintă o acțiune. Ea poate fi stocată în variabile, copiată de la o variabilă la alta sau pasată ca argument către alte funcții.
* **Gestiunea scope-ului și a datelor**: Variabilele declarate în interiorul unei funcții sunt locale și izolate. Funcția are acces la variabilele exterioare (globale), dar dacă o variabilă locală poartă același nume, aceasta o umbrește (*shadows*) pe cea exterioară.
* **Copierea argumentelor**: Valorile transmise ca argumente la apelare sunt întotdeauna copiate în variabilele locale (parametri).
* **Valoarea returnată implicită**: Execuția se oprește la întâlnirea directivei `return`. Orice funcție fără o instrucțiune `return` (sau cu `return;` gol) returnează automat valoarea `undefined`.

---

### 2. Unde diferă (Diferențe cheie)

* **Function Declaration vs. Function Expression vs. Arrow Functions**:
  * **Sintaxă & Punct și virgulă `;`**: `Function Declaration` se declară ca instrucțiune separată în fluxul principal de cod și nu necesită `;` la final. `Function Expression` este o atribuire în cadrul unei expresii și necesită `;` la finalul instrucțiunii. `Arrow Functions` oferă o sintaxă concisă.
  * **Momentul creării & Hoisting**: `Function Declaration` este procesată în faza de inițializare înainte de execuția scriptului (hoisting) și poate fi apelată **înainte** de linia unde este definită. `Function Expression` și `Arrow Functions` sunt create abia când fluxul de execuție ajunge la linia respectivă.
  * **Block Scope în Strict Mode**: În modul strict (`"use strict"`), o `Function Declaration` declarată într-un bloc de cod (`if`/`else`) este vizibilă doar în interiorul acelui bloc. Pentru acces din exterior, se folosește o variabilă declarată în exterior căreia i se atribuie o `Function Expression` sau `Arrow Function`.
* **Funcții Callback (Callback Functions)**:
  * Reprezintă funcții pasate ca argumente altor funcții pentru a fi apelate ulterior („called back”) în funcție de logică.
  * Pot fi pasate ca funcții declarate, expresii anonime sau Arrow Functions.
* **Particularitățile sintactice ale Arrow Functions**:
  * Pentru un singur parametru, parantezele pot fi omise (`n => n * 2`). Fără parametri, parantezele `()` sunt obligatorii (`() => alert("Hello")`).
  * O expresie pe o singură linie returnează implicit valoarea. Folosirea parantezelor acolade `{ ... }` creează un corp multiline și dezactivează returnarea implicită, fiind obligatoriu cuvântul cheie `return`.

---

### 3. Exemple paralele concise

```javascript
// 1. Function Declaration (Hoisted: apelabilă înainte de linie)
sayHi("Alice"); // "Hello, Alice"
function sayHi(name) { return `Hello, ${name}`; }

// 2. Function Expression (Creată la execuție, necesită ';' la final)
// sayHello("Bob"); // Error! Nu poate fi apelată înainte de definire
const sayHello = function(name) { return `Hello, ${name}`; };

// 3. Callback Functions (Exemplul 'ask' cu Arrow Functions)
function ask(question, yes, no) {
  if (confirm(question)) yes(); // Execută callback-ul 'yes'
  else no();                   // Execută callback-ul 'no'
}

ask(
  "Do you agree?",
  () => alert("You agreed."),          // Callback 'yes'
  () => alert("You canceled execution.") // Callback 'no'
);

// 4. Variabile Locale vs Exterioare & Umbrire (Shadowing)
let userName = "John"; // Variabilă exterioară/globală
function showUser() {
  let userName = "Bob"; // Locală: umbrește (shadows) variabila exterioară
  console.log("Hello, " + userName); // "Hello, Bob"
}
showUser();
console.log(userName); // "John" (variabila exterioară rămâne intactă)

// 5. Valori Implicite (Default) & Return
function showMessage(from, text = "no text given") { // Parametru default
  return from + ": " + text; // Explicit return
}
console.log(showMessage("Ann")); // "Ann: no text given"
```

---

### 4. Corner Cases & Capcane

* **Linie nouă după `return` (Automatic Semicolon Insertion)**: Dacă plasezi o linie nouă între `return` și expresia returnată, JavaScript inserează automat punct și virgulă (`return;`), făcând funcția să returneze `undefined`. Se rezolvă plasând paranteza de deschidere pe linia cu `return` (`return (`).
* **Omiterea cuvântului `return` la Arrow Functions cu acolade `{}`**: Scrierea `(a, b) => { a + b }` nu returnează suma, ci `undefined`, deoarece acoladele necesită `return a + b;` explicit.
* **Principiul „O funcție = O singură acțiune” & Prefixe**: Numele trebuie să fie un verb ce descrie exact o acțiune. Se folosesc prefixe standard: `get...`, `calc...`, `create...`, `check...`.
* **Funcții ca Comentarii (Cod Autodescriptiv)**: Separarea logicii complexe în funcții mici și bine denumite (ex: `isPrime(n)`) face codul autodescriptiv și ușor de citit.

---

### 5. Întrebări de Interviu & Răspunsuri

* **Q: Ce este o funcție callback în JavaScript și cum este utilizată?**  
  **Răspuns Tehnic**: O funcție callback este o funcție transmisă ca argument altei funcții, cu scopul de a fi apelată mai târziu („called back”) în interiorul acesteia. Acest lucru este posibil deoarece funcțiile sunt valori (*first-class values*).

* **Q: Care este diferența principală între o `Function Declaration` și o `Function Expression` în privința hoisting-ului?**  
  **Răspuns Tehnic**: `Function Declaration` este procesată în faza de inițializare a scriptului și este disponibilă în întregul scope, putând fi apelată înainte de definire. `Function Expression` este creată abia când fluxul de execuție ajunge la linia de atribuire.

* **Q: Ce valoare returnează o funcție dacă nu conține instrucțiunea `return`?**  
  **Răspuns Tehnic**: O funcție fără directiva `return` (sau cu `return;` gol) returnează implicit valoarea `undefined`.

---

