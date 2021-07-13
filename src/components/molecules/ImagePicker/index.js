import React, { useEffect, useState } from "react";
import * as Picker from 'expo-image-picker';
import { Box, IconButton } from "../../../components";
import { isWeb, uuid } from "@/utils";

const imageLibrayConfig = {
    mediaTypes: Picker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
}

const inferFileType = str => {
    if(typeof str === "string") return str.substring(str.lastIndexOf(".") + 1);
    return "";
}

export const ImagePicker = ({
    children,
    onChange,
    value
}) => {

    const [image,setImage] = useState(null);

    useEffect(() => {

        (async () => {
          if (!isWeb()) {
            const { status } = await Picker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert(COPY["errors.nocameraorgallery"]);
            }
          }
        })();

    }, []);

    useEffect( () => {

        const valueFileType = inferFileType(value);
        const valueHasValidType = valueFileType==="png" || valueFileType==="jpg";

        if(valueHasValidType)
            setImage(value);

    } , [value])

    const pickImage = async () => {
        let result = await Picker.launchImageLibraryAsync(imageLibrayConfig);
        if(typeof onChange === "function"){

            const fileType = inferFileType(result.uri)

            const file = {
                uri: result.uri,
                name: `photo-${uuid()}.${fileType}`,
                type: `image/${fileType}`
            }

            onChange(file,result)
        }

        if (!result.cancelled) {
            setImage({ uri: result.uri });
        }
    }



    return (    
        <Box
            position = "relative"
        >
            {typeof children === "function"
                ? children({ image })
                : children
            }
            <Box
                position = "absolute"
                bottom = {-15}
                right = {-15}
                bg = "red"
                p = {8}
                roundness={50}
            >
                <IconButton
                    onPressed={pickImage}
                    color = "#fff"
                    icon = "camera"
                    fontSize = {18}
                />
            </Box>
        </Box>
    )

};