import { Canvas, Path, Skia, Shadow } from "@shopify/react-native-skia";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { selectPickedColors } from "../redux/pickColorSlice";
import { Text, useFont } from "@shopify/react-native-skia";

export default function ColorRing() {

    const colors = useSelector(selectPickedColors);


    const font = useFont(require("../../assets/font/KoHo-Light.ttf"), 46);
    if(!font){
        return null;
    }
    const fontSize = font.measureText("Today's");
    const fontSizeSub = font.measureText("colors");


    const radius = 150;
    const strokeWidth = 30;
    const outerStrokeWidth = 46;
    const gap = 0.04;
    const innerRadius = radius - outerStrokeWidth / 2;

    const circlePath = Skia.Path.Make();
    circlePath.addCircle(radius, radius, innerRadius);
    //n,gap,decimal

    const path1 = Skia.Path.Make();
    path1.addCircle(radius, radius, innerRadius);

    const path2 = Skia.Path.Make();
    path2.addCircle(radius, radius, innerRadius);

    const path3 = Skia.Path.Make();
    path3.addCircle(radius, radius, innerRadius);

    const path4 = Skia.Path.Make();
    path4.addCircle(radius, radius, innerRadius);

    const path5 = Skia.Path.Make();
    path5.addCircle(radius, radius, innerRadius);

    return (
        <Canvas style={styles.container}>
            <Path
                path={path1}
                color={colors.color1}
                style="stroke"
                strokeWidth={strokeWidth}
                strokeJoin="round"
                strokeCap="round"
                start={0 + gap}
                end={0.25}
                gap={gap}
            >
                <Shadow dx={-3} dy={-3} blur={6} color="#93b8c4" />
            </Path>
            <Path
                path={path2}
                color={colors.color2}
                style="stroke"
                strokeWidth={strokeWidth}
                strokeJoin="round"
                strokeCap="round"
                start={0.25 + gap}
                end={0.45}
            >
                <Shadow dx={2} dy={4} blur={6} color="#93b8c4" />
            </Path>
            <Path
                path={path3}
                color={colors.color3}
                style="stroke"
                strokeWidth={strokeWidth}
                strokeJoin="round"
                strokeCap="round"
                start={0.45 + gap}
                end={0.65}
            >
                <Shadow dx={4} dy={2} blur={6} color="#93b8c4" />
            </Path>
            <Path
                path={path4}
                color={colors.color4}
                style="stroke"
                strokeWidth={strokeWidth}
                strokeJoin="round"
                strokeCap="round"
                start={0.65 + gap}
                end={0.85}
            >
                <Shadow dx={3} dy={4} blur={6} color="#93b8c4" />
            </Path>
            <Path
                path={path5}
                color={colors.color5}
                style="stroke"
                strokeWidth={strokeWidth}
                strokeJoin="round"
                strokeCap="round"
                start={0.85 + gap}
                end={1}
            >
                <Shadow dx={-2} dy={4} blur={5} color="#93b8c4" />
            </Path>
            <Text
                x={radius - fontSize.width / 2}
                y={radius + fontSize.height / 2 - fontSizeSub.height /1.5}
                text="Today's"
                font={font}
                color="#3A6655"

            >
                <Shadow dx={0} dy={4} blur={3} color="#93b8c4" />
            </Text>
            <Text
                x={radius - fontSizeSub.width / 2}
                y={radius + fontSizeSub.height / 2 + fontSize.height/1.5}
                text="colors"
                font={font}
                color="#3A6655"
            >
                <Shadow dx={0} dy={4} blur={3} color="#93b8c4" />
            </Text>

        </Canvas>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});