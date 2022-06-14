import { StyleSheet } from "react-native";

export default styles=StyleSheet.create({
    page:{
        flex:1,   
    },
    image:{
        width: "100%",
        aspectRatio: 5/3,
    },
    iconContainer:{
        position: "absolute",
        top: 40,
        left: 10,
    },
    container:{
        margin: 5,
        marginVertical: 5,

    },
    menuTitle:{
        marginTop: 20,
        fontSize: 18,
        letterSpacing: 0.7,
    },
    title:{
        fontSize: 35,
        fontWeight: "600",
    },
    subtitle:{
        color: "grey",
        fontSize: 15,
    },

});
