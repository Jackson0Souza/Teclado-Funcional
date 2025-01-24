const fraseCorreta = "Hello, World!";
const teclas = [
    'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
    'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
    'Ç', 'Z', 'X', 'C', 'V', 'B', 'N', 'M',
    'Espaço', 'Delete', '↑'
];

const teclasPontuacao = [
    ',', '.', ';', ':', '!', '?', '"', "'", '(', ')', '-', '+', '=', '@', '#', '$', '%', '&', '*', '/', '\\', '|'
];

const tecladoDiv = document.getElementById("teclado");
const entrada = document.getElementById("entrada");
const pontuacaoTecladoDiv = document.getElementById("pontuacaoTeclado");
const feedbackDiv = document.getElementById("feedback");
const vitoriaMensagem = document.getElementById("vitoriaMensagem");
const okButton = document.getElementById("okButton");
let shiftAtivo = false;
let tecladoDePontuacao = false;
let textoAtual = "";

function alternarTecladoPontuacao() {
  tecladoDePontuacao = !tecladoDePontuacao;
  alternarBtn.textContent = tecladoDePontuacao ? "abc" : "@?!";

  if (tecladoDePontuacao) {
    pontuacaoTecladoDiv.style.display = "grid";
    tecladoDiv.style.display = "none";
  } else {
    pontuacaoTecladoDiv.style.display = "none";
    tecladoDiv.style.display = "grid";
  }
}

function verificarEntrada() {
  if (textoAtual === fraseCorreta) {
    feedbackDiv.innerHTML =
      "<span class='correto'>Você completou a frase corretamente!</span>";
    vitoriaMensagem.style.display = "block";
    okButton.style.display = "inline-block";
    document.getElementById("frase").classList.add("correto");
    document.getElementById("frase").classList.remove("erro");
  } else {
    const correto = fraseCorreta.substring(0, textoAtual.length);
    if (textoAtual === correto) {
      feedbackDiv.innerHTML =
        "<span class='correto'>Correto até agora! Continue assim!</span>";
      document.getElementById("frase").classList.remove("erro");
      document.getElementById("frase").classList.remove("correto");
    } else {
      feedbackDiv.innerHTML =
        "<span class='erro'>Oops, parece que você errou. Tente novamente!</span>";
      document.getElementById("frase").classList.add("erro");
      document.getElementById("frase").classList.remove("correto");
    }
  }
}

function lidarComClique(tecla) {
  if (tecla === "↑") {
    shiftAtivo = !shiftAtivo;
    atualizarTeclado();
  } else if (tecla === "Delete") {
    textoAtual = textoAtual.slice(0, -1);
  } else if (tecla === "Espaço") {
    textoAtual += " ";
  } else if (tecla === "Alternar") {
    alternarTecladoPontuacao();
  } else {
    textoAtual += shiftAtivo ? tecla.toUpperCase() : tecla.toLowerCase();
  }

  entrada.value = textoAtual;
  verificarEntrada();
}

function atualizarTeclado() {
  const teclasShift = tecladoDiv.querySelectorAll(".tecla");
  teclasShift.forEach((tecla) => {
    if (tecla.textContent === "" || tecla.querySelector("img")) {
      return;
    }
    tecla.textContent = shiftAtivo
      ? tecla.textContent.toUpperCase()
      : tecla.textContent.toLowerCase();
  });
}

teclas.forEach((tecla) => {
  const teclaDiv = document.createElement("div");
  teclaDiv.classList.add("tecla");
  if (tecla === "Delete") {
    const img = document.createElement("img");
    img.src = "assets/icon/delete.png";
    img.alt = "Delete";
    img.style.width = "20px";
    img.style.height = "20px";
    teclaDiv.appendChild(img);
  } else if (tecla === "↑") {
    const span = document.createElement("span");
    span.classList.add("tecla-up");
    span.textContent = tecla;
    teclaDiv.appendChild(span);
  } else {
    teclaDiv.textContent = tecla === "Espaço" ? " " : tecla;
  }
  teclaDiv.addEventListener("click", () => lidarComClique(tecla));
  tecladoDiv.appendChild(teclaDiv);
});

teclasPontuacao.forEach((tecla) => {
  const teclaDiv = document.createElement("div");
  teclaDiv.classList.add("tecla-pontuacao");
  teclaDiv.textContent = tecla;
  teclaDiv.addEventListener("click", () => lidarComClique(tecla));
  pontuacaoTecladoDiv.appendChild(teclaDiv);
});

const alternarBtn = document.createElement("div");
alternarBtn.classList.add("tecla");
alternarBtn.textContent = "@?!";
alternarBtn.addEventListener("click", () => lidarComClique("Alternar"));
tecladoDiv.appendChild(alternarBtn);

const alternarBtnPontuacao = document.createElement("div");
alternarBtnPontuacao.classList.add("tecla-pontuacao");
alternarBtnPontuacao.textContent = "abc";
alternarBtnPontuacao.addEventListener("click", () =>
  lidarComClique("Alternar")
);
pontuacaoTecladoDiv.appendChild(alternarBtnPontuacao);

okButton.addEventListener("click", () => {
  textoAtual = "";
  entrada.value = "";
  feedbackDiv.innerHTML = "";
  vitoriaMensagem.style.display = "none";
  okButton.style.display = "none";
  document.getElementById("frase").classList.remove("correto", "erro");
});
