import logging
import sys
import io

# Cấu hình lại sys.stdout và sys.stderr để sử dụng encoding 'utf-8'
if sys.stdout.encoding.lower() != 'utf-8':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
if sys.stderr.encoding.lower() != 'utf-8':
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

# Định nghĩa SafeStreamHandler để xử lý UnicodeEncodeError
class SafeStreamHandler(logging.StreamHandler):
    def emit(self, record):
        try:
            msg = self.format(record)
            self.stream.write(msg + self.terminator)
            self.flush()
        except UnicodeEncodeError:
            # Thay thế các ký tự không thể mã hóa bằng '?'
            msg = self.format(record).encode('utf-8', errors='replace').decode('utf-8')
            self.stream.write(msg + self.terminator)
            self.flush()
        except Exception:
            self.handleError(record)

# Cấu hình logger
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

# Tạo SafeStreamHandler
stream_handler = SafeStreamHandler(sys.stdout)
stream_formatter = logging.Formatter('[%(asctime)s] %(levelname)s %(message)s')
stream_handler.setFormatter(stream_formatter)
logger.addHandler(stream_handler)
