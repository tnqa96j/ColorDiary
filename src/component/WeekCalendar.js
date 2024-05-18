import { addDays, eachDayOfInterval, eachWeekOfInterval, format, subDays } from "date-fns";
import { View, Text,ScrollView,StyleSheet } from "react-native";
import PagerView from "react-native-pager-view";

const dates = eachWeekOfInterval(
    {
        start: subDays(new Date(), 14),
        end: addDays(new Date(), 14),
    },
    {
        weekStartsOn: 1,
    }
).reduce((acc,cur)=>{
    const allDays = eachDayOfInterval({
        start:cur,
        end:addDays(cur,6),
    });

    acc.push(allDays);
    return acc;
},[]);

console.log(dates);

export default function WeekCalendar() {
    return(
    <PagerView style={styles.container}>
        {dates.map((week,i) => {
            return (
            <View key={i}>
                <View style={styles.row}>
                    {week.map((day) => {
                        const txt = format(day,'EEEEE')
                       return(
                        <View>
                            <Text style={styles.week}>{txt}</Text>
                            <Text style={styles.day}>{day.getDate()}</Text>
                        </View>
                       ); 
                    })}
                </View>
            </View>
            );
        })}
    </PagerView>
    );
}

const styles = StyleSheet.create({
    container:{
        width: '100%', height: '100%'
    },
    row:{
        flexDirection:'row',
        justifyContent:"space-around"
    },
    week:{
        textAlign:'center',
    },
    day:{
        textAlign:'center'
    }
});