export const firebaseError = (error: any) => {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return 'Email đã được sử dụng!';
    case 'auth/invalid-email':
      return 'Email không tồn tại !';
    case 'auth/email-already-in-use':
      return 'Email đã được sử dụng!';
    default:
      return 'Lỗi hệ thống xin vui lòng thử lại sau';
  }
};
