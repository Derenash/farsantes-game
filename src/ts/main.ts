document.addEventListener('DOMContentLoaded', () => {
  const color = getRandomColor();
  const main = document.querySelector('main');
  if (!main) {
    console.error("No main found");
    return;
  }
  createMultipleCharacters(main, 10, 1280, 720);
  const characters = document.querySelectorAll<HTMLImageElement>('.character');

  addJumpEventListener(characters);
  addClickEventListener(characters);
});

function createMultipleCharacters(parent: HTMLElement, amount: number, maximumX: number, maximumY: number): void {
  for (let i = 0; i < amount; i++) {
    const position = {
      x: Math.floor(Math.random() * maximumX),
      y: Math.floor(Math.random() * maximumY)
    };
    const color = getRandomColor();
    const character = createCharacter(color, position);
    parent.appendChild(character);
  }
}

function createCharacter(color: string, position: { x: number, y: number }): HTMLDivElement {
  const characterContainerContainer = document.createElement('div');
  characterContainerContainer.classList.add('character-container-container');
  characterContainerContainer.style.left = `${position.x}px`;
  characterContainerContainer.style.top = `${position.y}px`;

  const characterContainer = document.createElement('div');
  characterContainer.classList.add('character-container');

  let path = "assets/img/"

  if (position.x % 2 == 0) {
    path = "assets/imgFlip/"
  }

  const body = createCharacterElement('body', `${path}body.svg`);
  const hat = createCharacterElement('hat', `${path}hat-${color}.svg`);


  const delay = Math.floor(Math.random() * 1000);
  body.style.animationName = 'bounce-body-short';
  body.style.animationDuration = '1s';
  body.style.animationIterationCount = 'infinite';
  body.style.animationDelay = `${delay}ms`;

  hat.style.animationName = 'bounce-hat-short';
  hat.style.animationDuration = '1s';
  hat.style.animationIterationCount = 'infinite';
  hat.style.animationDelay = `${delay}ms`;


  characterContainer.appendChild(body);
  characterContainer.appendChild(hat);
  characterContainerContainer.appendChild(characterContainer);

  return characterContainerContainer;
}

function getRandomColor(): string {
  const colors = ['blue', 'green', 'red', 'orange'];
  const random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function createCharacterElement(className: string, src: string): HTMLImageElement {
  const element = document.createElement('img');
  element.classList.add('character', className);
  element.src = src;
  element.alt = "Character";
  return element;
}

function addJumpEventListener(characters: NodeListOf<HTMLImageElement>): void {
  if (characters.length > 0) {
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        characters.forEach(character => {
          character.classList.add('jump');
          setTimeout(() => {
            character.classList.remove('jump');
          }, 3000);
        });
      }
    });
  } else {
    console.error("No characters found");
  }
}

function addClickEventListener(characters: NodeListOf<HTMLImageElement>): void {
  characters.forEach(character => {
    character.addEventListener('click', () => {
      console.log("click");
    });
  });
}
