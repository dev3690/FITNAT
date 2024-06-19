// ----------------------------------------------------------------------

import { getLocalItem } from 'src/utils/local_operations';

let localData = getLocalItem("data")
export const account = {
  
  displayName: localData?.name,
  email: 'demo@minimals.cc',
  photoURL: '/assets/images/avatars/avatar_26.jpg',
};
