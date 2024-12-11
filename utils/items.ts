import { Category, FieldConfig } from "@/types/types";

export const complainantFields: FieldConfig[] = [
  { name: "name", title: "Nama", placeholder: "Nama", icon: "text-outline" },
  {
    name: "address",
    title: "Alamat",
    placeholder: "Alamat",
    icon: "location-outline",
  },
  {
    name: "phone",
    title: "Nomor Telepon",
    placeholder: "Nomor Telepon",
    keyboard: "phone-pad",
    icon: "keypad-outline",
  },
  {
    name: "a_education",
    title: "Pendidikan",
    placeholder: "Pendidikan",
    icon: "school-outline",
  },
  {
    name: "relation",
    title: "Hubungan",
    placeholder: "Hubungan",
    icon: "heart-outline",
  },
];

export const companionFields: FieldConfig[] = [
  { name: "name", title: "Nama", placeholder: "Nama", icon: "text-outline" },
  {
    name: "address",
    title: "Alamat",
    placeholder: "Alamat",
    icon: "location-outline",
  },
  {
    name: "phone",
    title: "Nomor Telepon",
    placeholder: "Nomor Telepon",
    keyboard: "phone-pad",
    icon: "keypad-outline",
  },
  {
    name: "b_education",
    title: "Pendidikan",
    placeholder: "Pendidikan",
    icon: "school-outline",
  },
  {
    name: "relation",
    title: "Hubungan",
    placeholder: "Hubungan",
    icon: "heart-outline",
  },
];

export const thirdFields: FieldConfig[] = [
  { name: "name", title: "Nama", placeholder: "Nama", icon: "text-outline" },
  {
    name: "borndate",
    title: "Tempat / Tanggal Lahir",
    placeholder: "Tempat / Tanggal Lahir",
    icon: "gift-outline",
  },
  {
    name: "c_gender",
    title: "Jenis Kelamin",
    placeholder: "Jenis Kelamin",
    icon: "male-female-outline",
  },
  {
    name: "national_id",
    title: "NIK",
    placeholder: "NIK",
    keyboard: "phone-pad",
    icon: "id-card-outline",
  },
  {
    name: "address",
    title: "Alamat",
    placeholder: "Alamat",
    icon: "location-outline",
  },
  {
    name: "phone",
    title: "Nomor Telepon",
    placeholder: "Nomor Telepon",
    keyboard: "phone-pad",
    icon: "keypad-outline",
  },
  {
    name: "c_education",
    title: "Pendidikan",
    placeholder: "Pendidikan",
    icon: "school-outline",
  },
  {
    name: "parent_name",
    title: "Nama Wali",
    placeholder: "Nama Wali",
    icon: "walk-outline",
  },
  {
    name: "occupation",
    title: "Pekerjaan Wali",
    placeholder: "Pekerjaan Wali",
    icon: "briefcase-outline",
  },
  {
    name: "parent_address",
    title: "Alamat Wali",
    placeholder: "Alamat Wali",
    icon: "earth-outline",
  },
  {
    name: "parent_phone",
    title: "Nomor Telepon Wali",
    placeholder: "Nomor Telepon Wali",
    icon: "phone-portrait-outline",
    keyboard: "phone-pad",
  },
];

export const forthFields: FieldConfig[] = [
  { name: "name", title: "Nama", placeholder: "Nama", icon: "text-outline" },
  {
    name: "d_gender",
    title: "Jenis Kelamin",
    placeholder: "Jenis Kelamin",
    icon: "male-female-outline",
  },
  {
    name: "borndate",
    title: "Tempat / Tanggal Lahir",
    placeholder: "Tempat / Tanggal Lahir",
    icon: "gift-outline",
  },
  {
    name: "address",
    title: "Alamat",
    placeholder: "Alamat",
    icon: "location-outline",
  },
  {
    name: "d_education",
    title: "Pendidikan",
    placeholder: "Pendidikan",
    icon: "school-outline",
  },
  {
    name: "occupation",
    title: "Pekerjaan",
    placeholder: "Pekerjaan",
    icon: "briefcase-outline",
  },
  {
    name: "status",
    title: "Status",
    placeholder: "Status",
    icon: "rose-outline",
  },
  {
    name: "relation",
    title: "Hubungan",
    placeholder: "Hubungan",
    icon: "heart-outline",
  },
];

export const fifthFields: FieldConfig[] = [
  {
    name: "types",
    title: "Tipe Kekerasan",
    placeholder: "Tipe Kekerasan",
    icon: "search-outline",
  },
  {
    name: "location",
    title: "Lokasi Kasus",
    placeholder: "Lokasi Kasus",
    icon: "location-outline",
  },
  {
    name: "physics",
    title: "Deskripsi Fisik",
    placeholder: "Deskripsi Fisik",
    icon: "hand-left-outline",
  },
  {
    name: "sexual",
    title: "Deskripsi Sexual",
    placeholder: "Deskripsi Sexual",
    icon: "male-female-outline",
  },
  {
    name: "psychology",
    title: "Deskripsi Psikologis",
    placeholder: "Deskripsi Psikologis",
    icon: "sad-outline",
  },
  {
    name: "economy",
    title: "Deskripsi Ekonomi",
    placeholder: "Deskripsi Ekonomi",
    icon: "cash-outline",
  },
  {
    name: "chronology",
    title: "Deskripsi Kronologis",
    placeholder: "Deskripsi Kronologis",
    icon: "extension-puzzle-outline",
    multiline: true,
  },
];

export const educationItems = [
  { key: "1", value: "SD" },
  { key: "2", value: "SMP" },
  { key: "3", value: "SMA" },
  { key: "4", value: "PT" },
  { key: "5", value: "Lainnya" },
];

export const genderItems = [
  { key: "1", value: "Laki - Laki" },
  { key: "2", value: "Perempuan" },
];

export const statusItems = [
  { key: "1", value: "Lajang" },
  { key: "2", value: "Menikah" },
  { key: "3", value: "Cerai Hidup" },
  { key: "4", value: "Cerai Mati" },
  { key: "5", value: "Janda / Duda" },
  { key: "6", value: "Lainnya" },
];

export const violencesTypesItems = [
  { key: "1", value: "Fisik" },
  { key: "2", value: "Sexual" },
  { key: "3", value: "Psikologis" },
  { key: "4", value: "Ekonomi" },
  { key: "5", value: "Lainnya" },
];

export const violencesLocItems = [
  { key: "1", value: "Rumah Tangga" },
  { key: "2", value: "Area Kerja" },
  { key: "3", value: "Area Publik" },
  { key: "4", value: "Digital / Online" },
];
