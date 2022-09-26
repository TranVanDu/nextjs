export const getDistrictByData = (data) => {
    if (!data) return null;
    var { address_components } = data;
    var province = "";
    var district = "";
    for (let i = 0; i < address_components.length; i++) {
        let types = address_components[i].types;
        if (types.indexOf("administrative_area_level_1") >= 0) {
            province = address_components[i].long_name;
            if (address_components[i - 1]) {
                district = address_components[i - 1].long_name;
            }
        }
    }
    return { province, district }
}