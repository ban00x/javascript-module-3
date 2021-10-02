import { getUrl } from "./api.js";

async function createCharacterContent(
  character,
  contentNode,
  createEpisodeContent,
  createOriginContent
) {
  const html = `<div class="card lg:card-side bordered p-5 ml-8 shadow-lg">
    <img src="${character.image}" alt="character profile image"/>
    <div class="flex pl-6 flex-col card-body">
      <h1 class="card-title font-semibold text-lg mt-6">${character.name}</h1>
      <p id="character-info">${character.species} | ${character.status} | ${character.gender} | </p>
    </div>
  </div>`;

  contentNode.innerHTML = html;

  const originButton = document.createElement("button");
  originButton.innerText = character.origin.name;
  originButton.onclick = async () => {
    const origin = await getUrl(character.origin.url);
    createOriginContent(
      origin,
      contentNode,
      createEpisodeContent,
      createCharacterContent
    );
  };

  const info = document.getElementById("character-info");
  info.appendChild(originButton);

  character.episode.forEach(async (episodeUrl) => {
    const response = await getUrl(episodeUrl);
    const { name, episode } = response;
    const episodeHtml = `
    <div class="flex flex-col justify-center items-center bg-gray-200 rounded-lg p-6 m-5 w-25 h-15">
      <h3 class="font-semibold">${name}</h3>
      <p>${episode}</p>
      </div>
    `;

    const episodeButton = document.createElement("button");
    episodeButton.onclick = async () => {
      createEpisodeContent(
        response,
        contentNode,
        createEpisodeContent,
        createCharacterContent
      );
    };

    episodeButton.innerHTML = episodeHtml;
    contentNode.appendChild(episodeButton);
  });
}

export { createCharacterContent };
