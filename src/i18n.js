import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// translations
const resources = {
  en: {
    translation: {
      dashboard: 'Dashboard',
      schedule: 'Schedule',
      timer: 'Timer',
      persian: 'persian',
      totalTask: 'Total Task',
      notStarted: 'Not Started',
      inProgress: 'In Progress',
      completed: 'Completed',
      currentWeekTimer: 'Current Week Timer',
      task: 'task',
      addTask: 'Add Task',
      editTask: 'Edit Task',
      deleteTask: 'Delete Task',
      edit: 'Edit',
      delete: 'Delete',
      add: 'Add',
      save: 'Save',
      InProgressReview: 'In Progress Review',
      taskCompletion: 'Task Completion',
      work: 'Work',
      personal: 'Personal',
      study: 'Study',
      fitness: 'Fitness',
      family: 'Family',
      health: 'Health',
      finance: 'Finance',
      travel: 'Travel',
      hobbies: 'Hobbies',
      social: 'Social',
      taskCategories: 'Task Categories',
      taskPriority: 'Task Priority',
      taskStatus: 'Task Status',
      null: 'null',
      noTask: 'No tasks to display',
      at: 'at',
      duration: 'Duration',
      low: 'Low',
      hight: 'High',
      urgent: 'Urgent',
      medium: 'Medium',
      Medium: 'Medium',
      Urgent: 'Urgent',
      Hight: 'High',
      Low: 'low',
      addTodo: 'addTodo',
      status: 'Status',
      priority: 'Priority',
      date: 'Date',
      addNewTask: 'Add New Task',
      statusRe: 'Status is required',
      category: 'Category',
      title: 'Title',
      titleInput: 'enter task title',
      months: {
        January: 'January',
        February: 'February',
        March: 'March',
        April: 'April',
        May: 'May',
        June: 'June',
        July: 'July',
        August: 'August',
        September: 'September',
        October: 'October',
        November: 'November',
        December: 'December',
      },

      weekdays: {
        Saturday: 'Saturday',
        Sunday: 'Sunday',
        Monday: 'Monday',
        Tuesday: 'Tuesday',
        Wednesday: 'Wednesday',
        Thursday: 'Thursday',
        Friday: 'Friday',
      },
      today: 'Today',
      yesterday: 'Yesterday',
      day: 'Day',
      week: 'Week',
      month: 'Month',
      year: 'Year',
      deleteTimer: 'Delete Timer',
      editTimer: 'Edit Timer',
      addTimer: 'Add Timer',
      total: 'Total',
      selectYourTask: 'Select Your Task ...',
      start: 'Start',
      stop: 'Stop',
      newTimer: 'new timer',
      taskTimer: 'Task Timer',
      timerInput: 'What are you working on?',
      searchInput: 'Type to search...',
      filterDate: 'filter by date',
      myProfile: 'My Profile',
      analyze: ' Analyze',
      logout: 'Logout',
      userName: 'User Name',
      password: 'Password',
      enterYourPassword: 'Enter Your Password',
      enterYourUserName: 'Enter Your User Name',
      chooseFile: 'Choose File',
      saveChanges: 'Save Changes',
    },
  },
  fa: {
    translation: {
      dashboard: 'داشبورد',
      schedule: 'برنامه ریزی',
      persian: 'فارسی',
      totalTask: ' همه تسک ها',
      notStarted: 'شروع نشده',
      'Not Started': 'شروع نشده',
      'In Progress': 'در حال انجام',
      Completed: 'تکمیل شده',
      inProgress: 'در حال انجام',
      completed: 'تکمیل شده',
      currentWeekTimer: 'تایمر هفته جاری',
      task: 'تسک',
      addTask: 'افزودن تسک',
      editTask: 'ویرایش تسک',
      deleteTask: 'حذف تسک',
      edit: 'ویرایش',
      delete: 'حذف',
      add: 'افزودن',
      save: 'ذخیره',
      InProgressReview: 'تسک های در حال انجام',
      taskCompletion: 'تسک های تکمیل شده',
      work: 'کار',
      personal: 'شخصی',
      Study: 'درسی',
      fitness: ' ورزشی',
      family: 'خانوادگی',
      health: 'سلامتی',
      finance: 'مالی',
      travel: 'مسافرت',
      hobbies: 'سرگرمی',
      social: 'اجتماعی',
      Work: 'کار',
      Personal: 'شخصی',
      SVGAElementtudy: 'درسی',
      Fitness: ' ورزشی',
      Family: 'خانوادگی',
      Health: 'سلامتی',
      Finance: 'مالی',
      Travel: 'مسافرت',
      Hobbies: 'سرگرمی',
      Social: 'اجتماعی',
      taskCategories: ' دسته بندی تسک ها',
      taskPriority: 'اولویت تسک ها',
      taskStatus: 'وضعیت تسک ها',
      null: 'هیچکدام',
      noTask: 'هیچ  تسکی برای نمایش وجود ندارد',
      at: 'در',
      duration: 'زمان',
      low: 'کم',
      high: 'مهم',
      urgent: 'خیلی مهم',
      medium: 'متوسط',
      Medium: 'متوسط',
      Low: 'کم',
      Urgent: 'خیلی ممهم',
      High: 'مهم',
      addTodo: 'افزودن تسک',
      status: 'وضعیت',
      priority: 'اولویت',
      date: 'تاریخ',
      addNewTask: 'افزودن تسک جدید',
      statusRe: 'وضعیت را وارد کنید',
      category: 'کتگوری',
      title: 'عنوان',
      titleInput: 'عنوان را وارد کنید',
      months: {
        January: 'فروردین',
        February: 'اردیبهشت',
        March: 'خرداد',
        April: 'تیر',
        May: 'مرداد',
        June: 'شهریور',
        July: 'مهر',
        August: 'آبان',
        September: 'آذر',
        October: 'دی',
        November: 'بهمن',
        December: 'اسفند',
      },
      weekdays: {
        Saturday: 'شنبه',
        Sunday: 'یک‌شنبه',
        Monday: 'دوشنبه',
        Tuesday: 'سه‌شنبه',
        Wednesday: 'چهارشنبه',
        Thursday: 'پنج‌شنبه',
        Friday: 'جمعه',
      },
      week: 'هفته',
      day: 'روز',
      year: 'سال',
      month: 'ماه',
      weekDay: 'روز هفته',
      today: 'امروز',
      yesterday: 'دیروز',
      deleteTimer: 'حذف تایمر',
      editTimer: 'ویرایش تایمر',
      addTimer: 'افزودن تایمر',
      total: 'کل',
      filter: 'فیلتر',
      start: 'شروع',
      stop: 'توقف',
      selectYourTask: '  انتخاب تسک...',
      newTimer: 'تایمر جدید',
      timer: 'زمان سنج',
      taskTimer: 'زمان سنج تسک',
      timerInput: 'روی چی کار میکنی؟',
      searchInput: ' ...جستجو',
      filterDate: ' فیلتر کردن با تاریخ',
      logout: 'خروج',
      myProfile: 'پروفایل من',
      userName: 'نام کاربری',
      enterYourPassword: ' پسوردتان را وارد کنید',
      enterYourUserName: ' نام کاربری  را واردکنید',
      chooseFile: 'انتخاب فایل',
      saveChanges: 'ذخیره تغییرات',
      Password: 'رمز عبور',
      username: 'نام کاربری',
    },
  },
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    detection: {
      // Use localStorage to save the language setting
      caches: ['localStorage'],
      order: ['localStorage', 'navigator', 'htmlTag'],
    },
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
