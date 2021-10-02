import { getUrl as getCharacter } from "./api.js";

async function createEpisodeContent(
  content,
  contentNode,
  createCharacterContent,
  createOriginContent
) {
  const html = `<div class="flex pl-6 flex-col"><p class="card bordered">
    <div><h1 class="something font-extrabold text-2xl mx-3">${content.name}</h1></div>
    <div>${content.air_date} | ${content.episode}</div>
  </div>
  </div>`;

  contentNode.innerHTML = html;

  content.characters.forEach(async (url) => {
    const character = await getCharacter(url);
    const characterHtml = `
    <div class="card text-center">
      <img class="px-10 pt-10 text-center w-72" src="${character.image}" />
      <h2 class="card-title text-center font-semibold text-lg mt-6">${character.name}</h2>
      <p>${character.species} | ${character.status}</p>
     </div>`;

    const characterButton = document.createElement("button");
    characterButton.onclick = async () => {
      createCharacterContent(
        character,
        contentNode,
        createEpisodeContent,
        createOriginContent
      );
    };

    characterButton.innerHTML = characterHtml;
    contentNode.appendChild(characterButton);
  });
}

export { createEpisodeContent };
