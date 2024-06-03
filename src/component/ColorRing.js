import { Canvas, Path, Skia, Shadow } from "@shopify/react-native-skia";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { selectPickedColor1,selectPickedColor2,selectPickedColor3,selectPickedColor4,selectPickedColor5 } from "../redux/pickColorSlice";
import { Text, useFont } from "@shopify/react-native-skia";
import { useSharedValue, withTiming } from 'react-native-reanimated';
import React, { useState, useEffect } from 'react';


export default function ColorRing() {

    const color1 = useSelector(selectPickedColor1);
    const color2 = useSelector(selectPickedColor2);
    const color3 = useSelector(selectPickedColor3);
    const color4 = useSelector(selectPickedColor4);
    const color5 = useSelector(selectPickedColor5);

    const start1 = useSharedValue(0);
    const start2 = useSharedValue(0);
    const start3 = useSharedValue(0);
    const start4 = useSharedValue(0);
    const start5 = useSharedValue(0);
    const end1 = useSharedValue(0);
    const end2 = useSharedValue(0);
    const end3 = useSharedValue(0);
    const end4 = useSharedValue(0);
    const end5 = useSharedValue(0);

    const radius = 150;
    const strokeWidth = 30;
    const outerStrokeWidth = 46;
    const gap = 0.04;
    const innerRadius = radius - outerStrokeWidth / 2;


    useEffect(() => {
        start1.value = withTiming(gap, { duration: 200 });
        start2.value = withTiming(0.25 + gap, { duration: 500 });
        start3.value = withTiming(0.45 + gap, { duration: 1000 });
        start4.value = withTiming(0.65 + gap, { duration: 1500 });
        start5.value = withTiming(0.85 + gap, { duration: 2000 });
        end1.value = withTiming(0.25, { duration: 500 });
        end2.value = withTiming(0.45, { duration: 1000 });
        end3.value = withTiming(0.65, { duration: 1500 });
        end4.value = withTiming(0.85, { duration: 2000 });
        end5.value = withTiming(1, { duration: 2500 });
    }, []);

    const font = useFont(require("../../assets/font/KoHo-Light.ttf"), 46);
    if (!font) {
        return null;
    }
    const fontSize = font.measureText("Today's");
    const fontSizeSub = font.measureText("colors");




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
                color={color1}
                style="stroke"
                strokeWidth={strokeWidth}
                strokeJoin="round"
                strokeCap="round"
                start={start1}
                end={end1}
                gap={gap}
            >
                <Shadow dx={-3} dy={-3} blur={6} color="#93b8c4" />
            </Path>
            <Path
                path={path2}
                color={color2}
                style="stroke"
                strokeWidth={strokeWidth}
                strokeJoin="round"
                strokeCap="round"
                start={start2}
                end={end2}
            >
                <Shadow dx={2} dy={4} blur={6} color="#93b8c4" />
            </Path>
            <Path
                path={path3}
                color={color3}
                style="stroke"
                strokeWidth={strokeWidth}
                strokeJoin="round"
                strokeCap="round"
                start={start3}
                end={end3}
            >
                <Shadow dx={4} dy={2} blur={6} color="#93b8c4" />
            </Path>
            <Path
                path={path4}
                color={color4}
                style="stroke"
                strokeWidth={strokeWidth}
                strokeJoin="round"
                strokeCap="round"
                start={start4}
                end={end4}
            >
                <Shadow dx={3} dy={4} blur={6} color="#93b8c4" />
            </Path>
            <Path
                path={path5}
                color={color5}
                style="stroke"
                strokeWidth={strokeWidth}
                strokeJoin="round"
                strokeCap="round"
                start={start5}
                end={end5}
            >
                <Shadow dx={-2} dy={4} blur={5} color="#93b8c4" />
            </Path>
            <Text
                x={radius - fontSize.width / 2}
                y={radius + fontSize.height / 2 - fontSizeSub.height / 1.5}
                text="Today's"
                font={font}
                color="#3A6655"

            >
                <Shadow dx={0} dy={4} blur={3} color="#93b8c4" />
            </Text>
            <Text
                x={radius - fontSizeSub.width / 2}
                y={radius + fontSizeSub.height / 2 + fontSize.height / 1.5}
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