import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
const Story = ()=>{
    return(
        <ScrollView horizontal style={styles.stories}>
            {[1, 2, 3, 4, 5].map((item) => (
              <View key={item} style={styles.storyItem}>
                <View style={styles.storyRing}>
                  <Image
                    source={{ uri: `https://randomuser.me/api/portraits/men/${item}.jpg` }}
                    style={styles.storyImage}
                  />
                </View>
                <Text style={styles.storyText}>User {item}</Text>
              </View>
            ))}
        </ScrollView>
    )
};
const styles = StyleSheet.create({
    stories: {
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc',
      },
      storyItem: {
        alignItems: 'center',
        marginHorizontal: 8,
      },
      storyRing: {
        width: 68,
        height: 68,
        borderRadius: 34,
        borderWidth: 2,
        borderColor: '#e1306c',
        justifyContent: 'center',
        alignItems: 'center',
      },
      storyImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
      },
      storyText: {
        fontSize: 12,
        marginTop: 4,
      },
});
export default Story;