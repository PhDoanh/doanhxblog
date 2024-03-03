---
status: Done
banner:
thumbnail:
draft: false
tags:
  - hướng-dẫn
  - cmake
  - vscode
  - visual-studio-code
  - sdl
  - sdl2
  - code-editor
created: 2024-02-17
due: 2024-02-29
---
%% Nhúng video ở đây %%

Thực tế, có rất nhiều cách khác nhau để cài đặt [SDL2](https://www.libSDL2.org/index.php), bài viết này đề cập đến tính **hiệu quả lâu dài** khi một dự án phát triển ngày càng lớn và khó kiểm soát hơn! Do đó, đây sẽ là một hướng dẫn toàn diện và bao quát! 

# Tải xuống MSYS2
[MSYS2](https://www.msys2.org/docs/what-is-msys2/) là phần mềm dùng để xây dựng, cài đặt và chạy các ứng dụng Windows. Mình sẽ dùng cái này để tải xuống SDL2 vì việc cài đặt và cập nhật nói chung nhanh và mạnh! Quá trình cài đặt MSYS2 như sau:

1. Tải xuống trình cài đặt tại [đây](https://github.com/msys2/msys2-installer/releases/download/2024-01-13/msys2-x86_64-20240113.exe)
2. Chạy trình cài đặt
3. Nhập thư mục bạn muốn cài MSYS2
![[Pasted image 20240218104131.png]]

4. Chọn 'Finish'
![[Pasted image 20240218104153.png]]

Ngay sau đó, một cửa sổ MSYS2 sẽ hiện ra. Vậy là xong!
![[Pasted image 20240218104522.png]]

# Tải xuống SDL2 và các công cụ cần thiết
Hãy giữ cho MSYS2 mở vì toàn bộ các công cụ, thư viện dưới đây đều được cài bằng lệnh `pacman`, thực chất là một phần mềm con được xây dựng bên trong MSYS2. 

## Cài đặt trình biên dịch
Vì các dự án SDL2 làm việc với C/C++ nên để chạy được mã nguồn, bạn cần một trình biên dịch `gcc` cho C hoặc `g++` cho C++.

Bạn có thể dùng lệnh: `gcc --verrsion` và `g++ --version` để biết chúng đã được cài đặt hay chưa. Nếu có rồi, mình khuyên bạn nên cài lại để dùng phiên bản chuẩn mới nhất từ MSYS2, hạn chế các lỗi vặt về sau. Dán lệnh sau vào cửa sổ MSYS2 rồi nhấn 'Enter': 

```
pacman -S mingw-w64-ucrt-x86_64-gcc
```

> [!info] Lưu ý
> - Lệnh trên sẽ cài cả gcc và g++ phiên bản mới nhất
> - Mỗi lần bạn gọi lệnh `pacman`, MSYS2 sẽ tự cập nhật phiên bản của chính nó! 

Cửa sổ MSYS2 sẽ hiển thị đầu ra như bên dưới. Nhấn 'Enter' để tiếp tục:

```
resolving dependencies...
looking for conflicting packages...

Packages (15) mingw-w64-ucrt-x86_64-binutils-2.41-2
            mingw-w64-ucrt-x86_64-crt-git-11.0.0.r216.gffe883434-1
            mingw-w64-ucrt-x86_64-gcc-libs-13.2.0-2  mingw-w64-ucrt-x86_64-gmp-6.3.0-2
            mingw-w64-ucrt-x86_64-headers-git-11.0.0.r216.gffe883434-1
            mingw-w64-ucrt-x86_64-isl-0.26-1  mingw-w64-ucrt-x86_64-libiconv-1.17-3
            mingw-w64-ucrt-x86_64-libwinpthread-git-11.0.0.r216.gffe883434-1
            mingw-w64-ucrt-x86_64-mpc-1.3.1-2  mingw-w64-ucrt-x86_64-mpfr-4.2.1-2
            mingw-w64-ucrt-x86_64-windows-default-manifest-6.4-4
            mingw-w64-ucrt-x86_64-winpthreads-git-11.0.0.r216.gffe883434-1
            mingw-w64-ucrt-x86_64-zlib-1.3-1  mingw-w64-ucrt-x86_64-zstd-1.5.5-1
            mingw-w64-ucrt-x86_64-gcc-13.2.0-2

Total Download Size:    49.38 MiB
Total Installed Size:  418.82 MiB

:: Proceed with installation? [Y/n]
[... downloading and installation continues ...]
```

Bây giờ, hãy kiểm tra trình biên dịch bạn vừa cài bằng lệnh sau:

```
gcc --version
```

Cửa sổ hiển thị như dưới là được (với g++ bạn làm tương tự)

```
gcc --version
gcc.exe (Rev3, Built by MSYS2 project) 13.2.0
Copyright (C) 2023 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
```

> [!warning]- gcc/g++ không tồn tại
> Nếu trình biên dịch mà bạn kiểm tra không tồn tại thì làm theo những bước sau:
> 1. Gõ "Edit the system environment variables" trong thanh tìm kiếm Window
> 2. Nhấp chọn 'Environment Variables...'
> 3. Trong mục "User variables for ...", chọn phần "Path" rồi nhấp 'Edit...'
> 5. Trong File Explorer, tìm thư mục cài đặt MSYS2 (msys64) và điều hướng đến đường dẫn sau: `C:\msys64\ucrt64\bin`
> 6. Trở lại cửa sổ "Edit environment variables", nhấp 'New'
> 7. Dán đường dẫn vào và nhấp chọn 'OK'
> 8. Trong cửa sổ "Environment Variables", nhấp 'OK'
> 9. Cuối cùng, nhấp 'Apply' rồi 'OK' tại cửa sổ "System Properties"

^d86c3e

## Cài đặt CMake
[CMake](https://cmake.org/about/) là một công cụ **tự động hóa** quá trình xây dựng, thử nghiệm và đóng gói dự án trên nhiều nền tảng, giúp bạn dễ dàng quản lí và phân phối phần mềm SDL2 của mình! Dán lệnh sau và nhấn 'Enter':

```
pacman -S mingw-w64-ucrt-x86_64-cmake
```

> [!info] Lưu ý
> Gói ở trên là tùy chọn tối ưu cho nền tảng Window, bạn cũng có thể cài gói `cmake` vì đây là gói chuẩn hoạt động trên nhiều nền tảng

Kiểm tra công cụ vừa cài bằng lệnh:

```
cmake --version
```

> [!warning]- cmake không tồn tại
> Làm tương tự các bước khi giải quyết [[#^d86c3e|gcc/g++ không tồn tại]] **nếu** đường dẫn `C:\msys64\ucrt64\bin` chưa được thêm trước đó.

## Cài đặt SDL2
Đây là nhân vật chính trong bài viết này, cài đặt nó bằng lệnh sau là xong rồi:

```
pacman -S mingw-w64-ucrt-x86_64-SDL2
```

Ngoài SDL2, còn có những thư viện mở rộng khác của nó hỗ trợ cho từng mục đích khác nhau như: SDL2_image, SDL2_sound, ... Bạn có thể lấy chúng tại [đây](https://packages.msys2.org/search?q=sdl2) và cài như trên!

> [!info] Lưu ý
> - Bản thân SDL2 cũng chứa đầy đủ các thao tác về hỉnh ảnh, âm thanh, ... Nhưng có một số hạn chế như không hỗ trợ các định dạng ảnh phổ biến (png, jpeg, ...) nên mới có tùy chọn mở rộng trên! 
> - Khi cài đặt các thư viện nói chung, bạn cần để ý đến các thành phần của gói, giả sử nếu gói có chứa `ucrt` thì những thư viện liên quan khác cũng phải có `ucrt` trong tên gói!   

# Thiết lập dự án SDL2 mẫu
Sau khi đã cài xong tất cả, để đảm bảo mọi thứ hoạt động bạn cần xây dựng một dự án mẫu **vừa để kiểm tra vừa làm mẫu** cho các dự án sau này. Một mũi tên trúng hai đích!

## Thiết lập đơn giản
1. Mở dự án mẫu tại [đây](https://github.com/PhDoanh/sdl2-cmake-base) 
2. Chọn "<> Code" > "Downloas ZIP" 
![[10.png]]
3. Giải nén file ZIP và lưu `sdl2-cmake-base-master` vào ví trí bất kì, ví dụ: `D:\Documents\sdl2-cmake-base-master`
4. Trong Visual Studio Code, chọn File > 'Open Folder...'
![[11.png]]
5. Chọn 'Select Folder' để mở dự án mẫu
![[12.png]]
6. Chọn View > Extensions để bổ sung thêm các tiện ích mở rộng (thứ giúp cho việc xây dựng dự án dễ dàng hơn)
![[13.png]]
7. Trong cửa hàng tiện ích, tìm và cài các gói sau: C/C++, CMake, "CMake Tools"    
![[15.png]]
8. Quay trở lại dự án (chọn View > Explorer), mở file `main.cpp` và chỉnh sửa thành mã nguồn của bạn hoặc để nguyên mã nguồn mẫu
![[Pasted image 20240222150414.png]]
9. Bây giờ chọn View > Terminal để mở dấu nhắc lệnh, mình sẽ dùng nó để thực thi dự án
![[Pasted image 20240222150839.png]]
10. Trong cửa sổ Terminal, chọn 'Command Prompt'
![[Pasted image 20240222151113.png]]
11. Tạo thư mục mới tên build trong dự án bằng lệnh `md build`
![[18.png]]
12. Chọn View > Command Palette... để mở hộp lệnh có sẵn
![[19.png]] ^68d30c
13. Nhập "CMake: Select a Kit", nhấn 'Enter' rồi chọn Kit "GCC .." được cài trong đường dẫn `..\msys64\ucrt64\bin\gcc.exe` 
![[20.png]]

> [!info] Lưu ý
> Nếu không có Kit nào xuất hiện, chọn `[Scan for kits]` rồi làm lại bước 13

14. Cuối cùng, nhập "CMake: Set Build Target" rồi chọn base (tên dự án của bạn)
![[Pasted image 20240222161257.png]]

## Đọc thêm: Thiết lập nâng cao
1. Thêm các thư mục, tệp còn **thiếu** trong dự án hiện tại của bạn
![[Pasted image 20240223144023.png]]
2. Trong từng thư mục inc, lib và test, thêm tệp CMakeLists.txt với nội dung `project(base)`. Ví dụ với inc:
![[Pasted image 20240223151618.png]]
3. Trong CMakeLists.txt, xóa dấu `#` bắt đầu ở mỗi dòng để được như hình rồi lưu lại. Bạn sẽ thấy cửa sổ Output thực thi cấu hình và kết quả nằm trong thư mục build!
![[Pasted image 20240223152611.png]]

> [!info] Lưu ý
> Bạn có thể thử xóa `#` ở dòng `find_package(SDL2_gfx REQUIRED)`, nếu gặp lỗi vui lòng hoàn tác lại!

**Vậy là hoàn tất thiết lập**! Bây giờ chúng ta sẽ đi giải phẫu dự án để hiểu về cách chúng hoạt động, kết nối với nhau vào tạo ra phần mềm hoàn chỉnh!
![[Pasted image 20240223154703.png]]

**Cấu trúc dự án hiện tại của bạn bao gồm:**
- **.vscode**: thư mục chứa các tệp cấu hình được tạo tự động bởi Visual Studio Code để dự án của bạn chạy được trong nó và không quan trọng khi phần mềm được phân phối nên không cần phải quan tâm!
- **build**: thư mục lưu trữ cấu hình dự án dùng để đóng gói, phân phối phần mềm đến với nhiều nền tảng. Có thể tạm hiểu **build** là sản phẩm cuối cùng, còn dự án chứa **build** là hậu trường làm ra nó!
- **doc**: thư mục chứa các tài liệu **chi tiết** hướng dẫn sử dụng phần mềm hoặc cộng tác dự án
- **inc**: thư mục lưu trữ các tệp tiêu đề (thư viện do bạn tạo ra) dùng để tích hợp vào trong mã nguồn, ví dụ: `.h, .hpp`
- **lib**: thư mục bao gồm các thư viện không được hỗ trợ sẵn bởi ngôn ngữ lập trình (thư viên của bên thứ 3) 
- **res**: Các tài nguyên như: hình ảnh, video, âm thanh, ... Sẽ được lưu trữ tại đây
- **test**: thư mục cho phép bạn viết các mã nguồn dùng để kiểm thử và gỡ lỗi phần mềm về tính năng, hiệu suất, độ tương thích, ... 
- **src**: đây là nơi bạn sẽ viết mã nguồn triển khai cho **inc** và mã nguồn chính (`main.cpp`), ví dụ: `.cpp`, `.c`, `.cxx` 
- **.gitignore**: là một tệp đặc biệt chứa các dữ liệu (tệp hoặc thư mục) riêng tư, không cần thiết mà Git nên bỏ qua khi chia sẻ dự án cho người khác
- **CMakeLists.txt**: là một tệp văn bản được sử dụng trong các dự án phần mềm để mô tả cách dự án nên được xây dựng 
- **LICENSE.txt**: là một tệp văn bản giấy phép xác định quyền của người dùng đối với mã nguồn của dự án
- **README.md**: là một tệp văn bản thường được sử dụng trong các dự án phần mềm để cung cấp **khái quát** thông tin quan trọng về dự án 

**Nội dung của tệp CMakeLists.txt:**
- **Dòng 2**: Sử dụng các tính năng cmake từ phiên bản 3.10 trở đi trong quá trình cấu hình  
- **Dòng 5**: Đặt tên dự án, dùng để nhận biết các CMakeLists.txt thuộc dự án nào 
- **Dòng 8 đến 16**: Thêm các cấu hình thư mục: **src**, **lib**, **inc** và **test** (tùy chọn) vào **build**. Riêng **res** chỉ được sao chép tới **build** (vì không cần quản lí hay liên kết từ các thư mục, tệp khác)
- **Dòng 19**: Tạo `base.exe` sau khi `src/main.cpp` được biên dịch bởi `mingw32-make`
- **Dòng 24 đến 30**: Kiểm tra các gói thư viện SDL2 đã được cài đặt hay chưa
- **Dòng 33**: Công khai các tệp tiêu đề và thư viện SDL2 để mã nguồn có thể sử dụng được
- **Dòng 46**: Liên kết các thư viện động với tệp EXE để phần mềm khi chạy có thể tải phông chữ, mở hình ảnh, chơi nhạc, ...

# Chạy dự án SDL2 mẫu
Các bước sau cũng được áp dụng khi dự án của bạn được [[#Đọc thêm Thiết lập nâng cao|thiết lập nâng cao]]!

1. Trong Terminal, lần lượt chạy các lệnh: `cd build` > `cmake ..` > `mingw32-make`
![[21.png]]

> [!info] Lưu ý
> - `cd build` sẽ điều hướng đến thư mục (build) cần **cấu hình lại**.
> - `cmake ..` sẽ **cấu hình lại** cấu trúc thư mục (build) nếu cấu trúc thư mục dự án (chứa build) bị thay đổi
> - `mingw32-make` sẽ biên dịch lại mã nguồn dự án (main.cpp cùng các tệp liên quan) và tạo ra file EXE (base.exe) 

> [!warning]- Lỗi khi chạy `cmake..`
> **Hình ảnh mô tả lỗi**: ![[Pasted image 20240222201008.png]]
> **Cách giải quyết**: Đảm bảo việc cấu hình thư mục build **lần đầu tiên** (khi build còn trống) được thực hiện ở phần [[#^68d30c|thiết lập đơn giản]] từ **bước 12 đến 14** rồi mới chạy lệnh `cmake`

2. Chạy `base` để xem thành quả!
![[Pasted image 20240222165517.png]]

> [!question]- Khi nào thì dùng `cmake`, `mingw32-make`?
> - `cmake` được dùng khi cấu trúc dự án bị thay đổi (thêm thư mục, xóa tệp, ...). Nếu bạn không cập nhật lại những thay đổi đó thì phần mềm vẫn sẽ chạy nhưng dùng cấu trúc dự án trước đó (chứa các dữ liệu trước lúc thay đổi)
> - `mingw32-make` được dùng khi bạn thực hiện các thay đổi trên mã nguồn (chỉnh sửa tệp CPP, HPP)