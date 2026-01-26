import React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';

const Data = [
  { id: '1', title: 'เกม' },
  { id: '2', title: 'มังงะ' },
  { id: '3', title: 'ดูหนัง' },
  { id: '4', title: 'นอน' },
];
const Data2 = [
  { id: '1', title: 'เเมลงสาบ' },
  { id: '2', title: 'นอนไม่พอ' },
  { id: '3', title: 'เน็ตไม่มี' },
  { id: '4', title: 'น้ำไม่อาบ' },
];

const App = () => {
  const renderItem = ({ item }: { item: { id: string; title: string } }) => (
    <View style={styles.itemContainer}>
      <View style={styles.dot} />
      <Text style={styles.itemText}>{item.title}</Text>
    </View>
  );
  const renderHeader = () => (
    <View>
      {/* ส่วน header */}
      <View style={styles.headercontainer}>
        <Text style={styles.title}>My Profile</Text>
      </View>

      <View style={styles.row}>
        <View style={[styles.box, { backgroundColor: 'red' }]}>
          <Text style={styles.boxtext}>66112331</Text>
        </View>
        <View style={[styles.box, { backgroundColor: 'blue' }]}>
          <Text style={styles.boxtext}>วิศวกรรมศาสตร์</Text>
        </View>
        <View style={[styles.box, { backgroundColor: 'orange' }]}>
          <Text style={styles.boxtext}>คอมพิวเตอร์</Text>
        </View>
      </View>

      <View style={styles.containerText}>
        <Text style={styles.text}>ข้อมลูส่วนตัว:</Text>
        <View style={styles.listItem}>
          <Text style={styles.text}>ชื่อ:ศุภวิชญ์ มงคลสสุข</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.text}>อายุ: 21 ปี</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.text}>อีเมล:suppawit@gmail.com</Text>
        </View>
      </View>

      <View style={styles.containerText}>
        <Text style={styles.text}>การศึกษา:</Text>
        <View style={styles.listItem}>
          <Text style={styles.text}>ระดับปริญญาตรี</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.text}>มหาวิทยาลัยธุรกิจบัณฑิตย์</Text>
        </View>
      </View>

      <View style={styles.containerText}>
        <Text style={styles.text}>ที่อยู่:</Text>
        <View style={styles.listItem}>
          <Text style={styles.text}>นนทบุรี บางใหญ่</Text>
        </View>
      </View>

      <View style={styles.contentSection}>
        <Text style={styles.sectionHeader}>สิ่งที่ชอบ</Text>
      </View>
    </View>
  );

  const renderFooter = () => (
    <View>
      <View style={styles.contentSection}>
        <Text style={styles.sectionHeader}>สิ่งที่ไม่ชอบ</Text>
      </View>
      {Data2.map((item) => renderItem({ item }))}
    </View>
  );

  return (
    <FlatList
      contentContainerStyle={styles.container}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}
      data={Data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  headercontainer: {
    height: 100,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  row: {
    flexDirection: 'row', // จัดวางเป็นแถวแนวนอน
    justifyContent: 'space-between', // เว้นระยะห่างระหว่างกล่อง
    marginBottom: 20, // ระยะห่างด้านล่างของแถว
  },
  box: {
    flex: 1, // ให้กล่องแต่ละกล่องมีขนาดเท่ากัน
    height: 100,
    justifyContent: 'center',
    marginHorizontal: 5, // ระยะห่างระหว่างกล่อง
    alignItems: 'center',
    borderRadius: 10,
  },
  boxtext: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
  containerText: {
    marginTop: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listItem: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#1A535C',
  },
  contentSection: {
    marginTop: 20,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1A535C',
    marginRight: 10,
  },
  itemText: {
    fontSize: 18,
    color: '#333',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
});

export default App;
