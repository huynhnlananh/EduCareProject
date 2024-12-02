import {
  Avatar,
  Button,
  Chip,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import PersonIcon from "@mui/icons-material/Person";
import GppGoodIcon from "@mui/icons-material/GppGood";
import SummarizeIcon from "@mui/icons-material/Summarize";
import { toast } from "react-toastify";
import { getInfoUserAsync, updateInfoUserAsync } from "../../services/profiles";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export const genders = [
  { value: "male", label: "Nam" },
  { value: "female", label: "Nữ" },
  { value: "other", label: "Giới tính khác" },
];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

const ProfilePage = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [myInfo, setMyInfo] = useState({
    name: "",
    email: "",
    role: "",
    updatedAt: "",
    hobby: "",
    phoneNumber: "",
    birthday: "",
  });

  useEffect(() => {
    fetchMyInfoByIdAsync();
  }, []);

  const fetchMyInfoByIdAsync = async () => {
    try {
      const id = 3; // Mock ID, sau sẽ lấy từ thông tin đăng nhập
      const response = await getInfoUserAsync(id);
      setMyInfo(response.data);
    } catch (error) {
      toast.error("Lỗi khi lấy thông tin người dùng", {
        toastId: "not-found-user",
      });
    }
  };

  const handleDateStartChange = (date) => {
    setMyInfo((prev) => ({
      ...prev,
      birthday: new Date(String(date)),
    }));
  };
  const shouldDisableDate = (date) => {
    return date.isAfter(dayjs(), "day");
  };

  const incrementDateByOne = (date) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    return newDate.toISOString().split("T")[0];
  };

  const handleSaveUpdate = async () => {
    const body = {
      ...myInfo,
      birthday: incrementDateByOne(myInfo?.birthday),
    };
    try {
      const id = 3; // Mock ID, sau sẽ lấy từ thông tin đăng nhập
      const response = await updateInfoUserAsync(id, body);
      setMyInfo(response.data);
      setIsEdit(false);
      toast.success("Chỉnh sửa thông tin thành công");
    } catch (err) {
      toast.error("Chỉnh sửa thông tin thất bại", {
        toastId: "not-found-user",
      });
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl py-8 px-8 my-12 overflow-hidden bg-white shadow-sm rounded-lg">
      <div className="flex gap-24">
        <div className="w-[300px] text-gray-700">
          <h2 className="text-[#4b7782] text-xl font-semibold">Cài đặt</h2>
          <div className="p-4 my-4 shadow-lg rounded-lg border bg-white">
            <div className="flex items-center gap-2">
              <FolderSharedIcon sx={{ color: "#1a8efd" }} />
              <span className="text-gray-700">Trải nghiệm chung</span>
            </div>
            <p className="text-gray-700 font-semibold">Trung tâm Tài khoản</p>
            <p className="text-xs text-gray-400 py-4">
              Quản lý trải nghiệm kết nối và cài đặt tài khoản của bạn trên các
              công nghệ Meta.
            </p>
            <ul className="text-sm">
              <li className="flex gap-2 items-center py-2">
                <PersonIcon sx={{ color: "#1a8efd", fontSize: "px" }} />
                <span>Chi tiết Cá nhân</span>
              </li>
              <li className="flex gap-2 items-center py-2">
                <GppGoodIcon sx={{ color: "#1a8efd", fontSize: "20px" }} />
                <span>Mật khẩu và Bảo mật</span>
              </li>
              <li className="flex gap-2 items-center py-2">
                <SummarizeIcon sx={{ color: "#1a8efd", fontSize: "20px" }} />
                <span>Ưu tiên Quảng cáo</span>
              </li>
            </ul>
            <p className="text-sm text-gray-700 pt-2">
              Xem thêm trong Trung tâm Tài khoản
            </p>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h2 className="text-cyan-800 text-xl font-semibold">
              Chỉnh sửa trang cá nhân
            </h2>
            <div>
              {isEdit ? (
                <div className="flex gap-4">
                  <Button variant="contained" onClick={handleSaveUpdate}>
                    Lưu
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setIsEdit(false);
                      fetchMyInfoByIdAsync();
                    }}
                  >
                    Hủy
                  </Button>
                </div>
              ) : (
                <Button variant="outlined" onClick={() => setIsEdit(true)}>
                  Chỉnh sửa
                </Button>
              )}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between w-full gap-12 !bg-white p-6 mt-2 mb-6 rounded-xl shadow-lg border">
              <div className="flex items-center gap-4 w-full">
                <Avatar
                  alt={"avatar"}
                  src={
                    myInfo?.avatarUrl ||
                    "https://i.pinimg.com/564x/62/68/9c/62689cccc0ec5faaacb7770269d5c0ab.jpg"
                  }
                  sx={{ width: 80, height: 80 }}
                />
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-gray-900 truncate w-52">
                    {myInfo?.name}
                  </span>
                  <span className="text-sm text-gray-700">{myInfo?.email}</span>
                </div>

                <Chip
                  // color="primary"
                  label={`${myInfo?.role?.toUpperCase()}`}
                  sx={{ backgroundColor: "#fae3ee", color: "#b33871" }}
                />
                {myInfo?.updatedAt && (
                  <Chip
                    // color="primary"
                    label={`Lần cuối cập nhật : ${dayjs(
                      myInfo?.updatedAt
                    ).format("DD/MM/YYYY")}`}
                    sx={{ backgroundColor: "#fae3ee", color: "#b33871" }}
                  />
                )}
              </div>
            </div>
            <div className="bg-white p-4 border shadow-lg rounded-lg">
              <div className="py-4">
                <p className="font-medium text-sm pb-2 text-gray-700">
                  Sở thích
                </p>
                <textarea
                  rows={4}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-cyan-600 focus:border-blue-500 outline-none
                  disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-300 disabled:cursor-not-allowed"
                  placeholder="Introduce yourself"
                  value={myInfo?.hobby}
                  onChange={(e) =>
                    setMyInfo((prev) => ({ ...prev, hobby: e.target.value }))
                  }
                  disabled={!isEdit}
                ></textarea>
              </div>
              <div className="flex gap-6 ">
                <div className="mb-2 w-1/2">
                  <label
                    htmlFor="fullName"
                    className="font-medium text-sm pb-2 text-gray-700"
                  >
                    Họ tên
                  </label>
                  <TextField
                    sx={{
                      fontFamily: "Lexend",
                      marginTop: "10px",
                      bgcolor: !isEdit ? "" : "white",
                    }}
                    fullWidth
                    id="fullName"
                    variant="outlined"
                    onChange={(e) =>
                      setMyInfo((prev) => ({ ...prev, name: e.target.value }))
                    }
                    value={myInfo?.name}
                    disabled={!isEdit}
                  />
                </div>
                <div className="mb-2 w-1/2">
                  <label
                    htmlFor="phoneNumber"
                    className="font-medium text-sm pb-2 text-gray-700"
                  >
                    Số điện thoại
                  </label>
                  <TextField
                    type="text"
                    sx={{
                      fontFamily: "Lexend",
                      marginTop: "10px",
                      bgcolor: !isEdit ? "" : "white",
                    }}
                    fullWidth
                    id="phoneNumber"
                    variant="outlined"
                    onChange={(e) =>
                      setMyInfo((prev) => ({
                        ...prev,
                        phoneNumber: e.target.value,
                      }))
                    }
                    value={myInfo?.phoneNumber}
                    disabled={!isEdit}
                  />
                </div>
              </div>
              <div className="flex gap-6">
                <div className="mb-2 w-1/2">
                  <label
                    htmlFor="gender"
                    className="font-medium text-sm pb-2 text-gray-700"
                  >
                    Giới tính
                  </label>
                  <FormControl fullWidth sx={{ marginTop: 1.5 }}>
                    <Select
                      labelId="gender"
                      id="gender"
                      value={
                        genders.find(
                          (gender) => gender.value === myInfo?.gender
                        ) || ""
                      }
                      onChange={(e) =>
                        setMyInfo((prev) => {
                          return {
                            ...prev,
                            gender: e.target.value.value,
                          };
                        })
                      }
                      MenuProps={MenuProps}
                      disabled={!isEdit}
                      sx={{ bgcolor: !isEdit ? "" : "white" }}
                    >
                      {genders.map((genders, index) => (
                        <MenuItem key={`genders-${index}`} value={genders}>
                          {genders.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="mb-2 w-1/2">
                  <label
                    htmlFor="birthday"
                    className="font-medium text-sm pb-2 text-gray-700"
                  >
                    Ngày sinh
                  </label>
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    sx={{ width: "100% !important" }}
                  >
                    <DemoContainer
                      components={["DatePicker"]}
                      sx={{ width: "100%" }}
                    >
                      <DatePicker
                        value={dayjs(myInfo?.birthday)}
                        onChange={handleDateStartChange}
                        shouldDisableDate={shouldDisableDate}
                        disabled={!isEdit}
                        sx={{ width: "100%", borderColor: "#000 !important" }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
