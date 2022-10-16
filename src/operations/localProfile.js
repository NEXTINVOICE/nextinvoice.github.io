export const getProfiles = () => {
  const profiles = JSON.parse(localStorage.getItem("nxtInvProfiles"));
  if (!profiles) {
    console.log("Profiles not available");
    console.log("Creating profile set...");
    localStorage.setItem("nxtInvProfiles", JSON.stringify([]));
    return [];
  } else {
    return profiles;
  }
};

export const setProfile = (data) => {
  let profiles = JSON.parse(localStorage.getItem("nxtInvProfiles"));
  if (!profiles) {
    console.log("Profiles not available");
    console.log("Creating profile set...");
    localStorage.setItem("nxtInvProfiles", JSON.stringify([data]));
    return;
  } else {
    profiles.push(data);
    localStorage.setItem("nxtInvProfiles", JSON.stringify(profiles));
  }
};
