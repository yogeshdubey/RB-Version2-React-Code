import { fetchWrapper } from '../Helpers';

const baseUrl = `${import.meta.env.VITE_APP_API_URL}`;
const dealerId = 3943
//const tamayouInfluencerbaseUrl = `${process.env.REACT_APP_API_URL}/tamayou_influencers`;

export const appService = {
  getAdditionalOption,
};

function getAdditionalOption(option) {
  return fetchWrapper.get(`${baseUrl}/GetDiamondsJCOptions?DealerId=${dealerId}`);
}