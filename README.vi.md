## Bản dịch README

**Ngôn ngữ:**[Tiếng Anh](README.md)\|[Tiếng Trung giản thể](README.zh-CN.md)\|[Tiếng Trung phồn thể](README.zh-TW.md)\|[Tiếng Hindi](README.hi.md)\|[Ả Rập](README.ar.md)\|[người Pháp](README.fr.md)\|[tiếng Tây Ban Nha](README.es.md)\|[tiếng Đức](README.de.md)\|[tiếng Nhật](README.ja.md)\|[tiếng Bồ Đào Nha](README.pt.md)\|[tiếng Nga](README.ru.md)\|[người Ý](README.it.md)\|[hàn quốc](README.ko.md)\|[tiếng Thổ Nhĩ Kỳ](README.tr.md)\|[tiếng Hà Lan](README.nl.md)\|[Thái](README.th.md)\|[Tiếng Việt](README.vi.md)\|[Đánh bóng](README.pl.md)\|[tiếng Ukraina](README.uk.md)\|[tiếng Hy Lạp](README.el.md)

# Nhóm Shield Telegram Bot

Chức năng chính của Group Shield Telegram Bot là xác minh thành viên mới. Người dùng phải vượt qua quá trình xác minh trước khi có thể gửi tin nhắn trong nhóm.

Hỗ trợ cài đặt đa ngôn ngữ và thích ứng linh hoạt với ngôn ngữ của người dùng.

## Đặc trưng

-   /tắt tiếng {phút}
    Bạn có thể sử dụng lệnh /mute để ngăn người khác gửi tin nhắn. Trước khi sử dụng, hãy trả lời tin nhắn của người đó. Theo mặc định, việc tắt tiếng là vĩnh viễn nhưng bạn có thể thêm thời lượng tính bằng phút sau lệnh. Ví dụ: thêm “1” sẽ tắt tiếng chúng trong 1 phút.
-   /bật tiếng Để tắt tiếng ai đó trong nhóm và cho phép họ gửi lại tin nhắn, hãy trả lời tin nhắn của họ trước khi sử dụng lệnh.
-   /phát bóng {phút} 
    Bạn có thể sử dụng lệnh /kickout để xóa ai đó khỏi nhóm. Trả lời tin nhắn của người đó trước khi sử dụng lệnh. Theo mặc định, việc xóa là vĩnh viễn nhưng bạn có thể thêm thời lượng tính bằng phút sau lệnh. Ví dụ: thêm “1” nghĩa là họ có thể tham gia lại sau 1 phút.

![screenshot](https://raw.githubusercontent.com/CECEthanClarke/group-shield-tg-bot/refs/heads/main/other/image.png)![screenshot](https://raw.githubusercontent.com/CECEthanClarke/group-shield-tg-bot/refs/heads/main/other/image2.png)

## Hướng dẫn triển khai

### Bước 1: Tạo Bot Telegram của bạn

1.  đi đến**@BotFather**trên Telegram và sử dụng`/newbot`lệnh để tạo bot của bạn.
2.  Làm theo lời nhắc để cung cấp thông tin cần thiết.
3.  Sau khi được tạo,**@BotFather**sẽ gửi cho bạn mã thông báo của bot. Mã thông báo này rất cần thiết cho việc triển khai—hãy lưu nó để sử dụng sau.

### Bước 2: Triển khai Bot lên Server

Bạn cần sao chép tệp docker-compose.yml từ thư mục nguồn vào thư mục máy chủ của bạn. Sau đó, định cấu hình các giá trị cho BOT_TOKEN và BOT_USERNAME trong tệp docker-compose.yml.

-   BOT_TOKEN – Đây là mã thông báo của bot.
-   BOT_USERNAME – Đây là tên người dùng của bot không có ký hiệu “@”.

Sau khi điền xong, bạn đã sẵn sàng để đi.

-   VERIFICATION_EXPIration_SECONDS – Mặc định là 120 giây. Điều này có nghĩa là người dùng có 120 giây để hoàn tất quy trình xác minh khi tham gia nhóm. Nếu thất bại, họ sẽ bị loại bỏ.
-   RE_JOIN_SECONDS – Mặc định là 120 giây. Sau khi bị xóa, người dùng có thể tham gia lại nhóm sau 120 giây.
-   LANGUAGE_CODE – Mặc định là “en”.["en", "zh", "es", "của", "nl", "nó", "ar", "pt", "ko", "ru", "fr", "id", "ms ", "fa", "uk", "vi", "tr", "ja"]
-   ADMIN_CHAT_ID - Nhập ID trò chuyện của bạn. Sau khi vào, robot sẽ thông báo cho bạn khi nó đã bắt đầu.
-   ENFORCE_PRIMARY_LANGUAGE - Mặc định là sai, ‘false’ có nghĩa là hệ thống sẽ tự động chuyển đổi dựa trên mã ngôn ngữ của người dùng. Đặt thành 'true' có nghĩa là tất cả cấu hình sẽ tuân theo ngôn ngữ chính bạn đặt.
-   UPDATE_NOTIFICATION_URL - Bạn có thể xác định URL thông báo và bot sẽ gửi thông báo cập nhật qua POST tới ứng dụng máy chủ của bạn. Nếu để trống, tính năng này sẽ bị tắt theo mặc định.
-   UPDATE_NOTIFICATION_AUTHORIZATION - Bạn có thể xác định tiêu đề Cấp phép để xác thực thông báo. Nếu để trống, tính năng này bị tắt theo mặc định.

### Bước 3: Khởi động Bot

Sau khi định cấu hình mọi thứ, hãy khởi động bot bằng cách chạy lệnh sau:

```bash
docker compose up -d
```
