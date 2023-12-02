export const firebaseError = (error: any) => {
  switch (error?.code) {
    case 'auth/email-already-in-use':
      return 'Email đã được sử dụng!';
    case 'auth/invalid-email':
      return 'Email không tồn tại !';
    case 'auth/email-already-in-use':
      return 'Email đã được sử dụng!';
    case 'auth/invalid-phone-number':
      return 'Số điện thoại không hợp lệ';
    case 'auth/invalid-verification-code':
      return 'Mã xác nhận không hợp lệ';

    default:
      return 'Lỗi hệ thống xin vui lòng thử lại sau';
  }
};
