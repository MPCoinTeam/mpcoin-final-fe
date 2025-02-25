import * as SecureStore from 'expo-secure-store';

const MAX_SIZE = 2048; // Giới hạn 2KB

export const saveLargeData = async (key:string, base64Data:string) => {
  const size = new TextEncoder().encode(base64Data).length;
  console.log(`📏 Kích thước dữ liệu: ${size} bytes`);

  if (size <= MAX_SIZE) {
    // Nếu nhỏ hơn 2KB, lưu bình thường
    await SecureStore.setItemAsync(key, base64Data);
    console.log('✅ Dữ liệu đã lưu vào SecureStore');
    return;
  }

  // Nếu lớn hơn 2KB, chia nhỏ dữ liệu
  const parts = [];
  for (let i = 0; i < base64Data.length; i += MAX_SIZE) {
    parts.push(base64Data.substring(i, i + MAX_SIZE));
  }

  // Lưu từng phần vào SecureStore
  for (let i = 0; i < parts.length; i++) {
    await SecureStore.setItemAsync(`${key}_part${i}`, parts[i]);
  }

  // Lưu số lượng phần để ghép lại khi lấy
  await SecureStore.setItemAsync(`${key}_count`, parts.length.toString());
  console.log(`✅ Dữ liệu đã chia thành ${parts.length} phần và lưu vào SecureStore`);
};

export const getLargeData = async (key:string) => {
  try {
    const count = await SecureStore.getItemAsync(`${key}_count`);
    if (!count) {
      console.log('❌ Không tìm thấy dữ liệu');
      return null;
    }

    let fullData = '';
    for (let i = 0; i < parseInt(count, 10); i++) {
      const part = await SecureStore.getItemAsync(`${key}_part${i}`);
      if (part) {
        fullData += part;
      } else {
        console.warn(`⚠️ Phần ${i} bị mất`);
        return null;
      }
    }

    console.log('✅ Dữ liệu đã ghép lại thành công');
    return fullData;
  } catch (error) {
    console.error('⚠️ Lỗi khi lấy dữ liệu:', error);
    return null;
  }
};
