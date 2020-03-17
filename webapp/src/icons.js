import {library} from "@fortawesome/fontawesome-svg-core";
import {
  faVideo,
  faCamera,
  faSpinner,
  faAngry,
  faGrinTongueSquint,
  faGrimace,
  faGrin,
  faMeh,
  faSadTear,
  faSurprise,
  faMale,
  faFemale,
  faTimesCircle
} from "@fortawesome/free-solid-svg-icons";

export const createFaLibrary = () => {
  library.add(
    faVideo,
    faCamera,
    faSpinner,
    faAngry,
    faGrinTongueSquint,
    faGrimace,
    faGrin,
    faMeh,
    faSadTear,
    faSurprise,
    faMale,
    faFemale,
    faTimesCircle
  );
};
