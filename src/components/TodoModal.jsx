import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addTask } from "../store/todoSlice";
import Select from "react-select";

const TodoModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [todoType, setTodoType] = useState({});
  const [dueDate, setDueDate] = useState(new Date());
  const [priority, setPriority] = useState("Moderate");
  const [todoMessage, setTodoMessage] = useState("");
  const isDarkMode = useSelector((state) => state.mode.isDark);
  const dispatch = useDispatch();
  const [error, setError] = useState({
    todoType: false,
    dueDate: false,
    priority: false,
    todoMessage: false,
  });

  const options = [
    { label: "Buy Groceries", value: "buy_groceries" },
    { label: "Reply to Emails", value: "reply_emails" },
    { label: "Attend Meeting", value: "attend_meeting" },
    { label: "Complete Project Report", value: "complete_project_report" },
    { label: "Go for a Run", value: "go_for_run" },
    { label: "Schedule Doctor's Appointment", value: "schedule_appointment" },
    { label: "Pay Bills", value: "pay_bills" },
    { label: "Clean the House", value: "clean_house" },
    { label: "Pick Up Laundry", value: "pick_up_laundry" },
    { label: "Complete Assignment", value: "complete_assignment" },
    { label: "Call Client", value: "call_client" },
    { label: "Go to the Gym", value: "go_to_gym" },
    { label: "Attend Webinar", value: "attend_webinar" },
    { label: "Read a Book", value: "read_book" },
    { label: "Plan Weekend Trip", value: "plan_trip" },
    { label: "Prepare Presentation", value: "prepare_presentation" },
    { label: "Submit Tax Documents", value: "submit_tax_documents" },
    { label: "Buy a Gift", value: "buy_gift" },
    { label: "Walk the Dog", value: "walk_dog" },
    { label: "Meditate", value: "meditate" },
    { label: "Organize Desk", value: "organize_desk" },
    { label: "Buy Birthday Gift", value: "buy_birthday_gift" },
    { label: "Respond to Client's Query", value: "respond_client_query" },
    { label: "Set Goals for the Month", value: "set_goals" },
    { label: "Visit Parents", value: "visit_parents" },
    { label: "Clean Garage", value: "clean_garage" },
    { label: "Get Car Serviced", value: "get_car_serviced" },
    { label: "Book Flight Tickets", value: "book_flight_tickets" },
    { label: "Watch a Movie", value: "watch_movie" },
    { label: "Attend Yoga Class", value: "attend_yoga_class" },
    { label: "Buy New Clothes", value: "buy_new_clothes" },
    { label: "Schedule Family Dinner", value: "schedule_family_dinner" },
    { label: "Prepare Lunch", value: "prepare_lunch" },
    { label: "Read News", value: "read_news" },
    { label: "Send Meeting Notes", value: "send_meeting_notes" },
    { label: "Write Journal", value: "write_journal" },
    { label: "Update Resume", value: "update_resume" },
    { label: "Plan a Date Night", value: "plan_date_night" },
    { label: "Fix Broken Light Bulb", value: "fix_broken_light_bulb" },
    { label: "Unsubscribe from Spam Emails", value: "unsubscribe_spam" },
    { label: "Donate Clothes", value: "donate_clothes" },
    { label: "Update Software", value: "update_software" },
    { label: "Create Budget", value: "create_budget" },
    { label: "Write Thank You Note", value: "write_thank_you_note" },
    { label: "Go for a Walk", value: "go_for_walk" },
    { label: "Clean Kitchen", value: "clean_kitchen" },
    { label: "Schedule Car Wash", value: "schedule_car_wash" },
    { label: "Water the Plants", value: "water_plants" },
    { label: "Check Bank Statements", value: "check_bank_statements" },
    { label: "Meet with Friends", value: "meet_with_friends" },
    { label: "Sort Emails", value: "sort_emails" },
    { label: "Get Haircut", value: "get_haircut" },
    { label: "Take Vitamins", value: "take_vitamins" },
    { label: "Update Calendar", value: "update_calendar" },
    { label: "Prepare for Exam", value: "prepare_for_exam" },
    { label: "Clean Windows", value: "clean_windows" },
    { label: "Check Mailbox", value: "check_mailbox" },
    { label: "Test New App", value: "test_new_app" },
    { label: "Sign up for Newsletter", value: "sign_up_newsletter" },
    { label: "Backup Files", value: "backup_files" },
    { label: "Update Social Media", value: "update_social_media" },
    { label: "Create Vision Board", value: "create_vision_board" },
    { label: "Go to the Dentist", value: "go_to_dentist" },
    { label: "Attend Conference", value: "attend_conference" },
    { label: "Organize Files", value: "organize_files" },
    { label: "Fix Wi-Fi Issue", value: "fix_wifi_issue" },
    { label: "Review Website", value: "review_website" },
    { label: "Check Weather", value: "check_weather" },
    { label: "Buy Supplements", value: "buy_supplements" },
    { label: "Listen to Podcast", value: "listen_podcast" },
    { label: "Do Laundry", value: "do_laundry" },
    { label: "Prepare for Interview", value: "prepare_for_interview" },
    { label: "Order Takeout", value: "order_takeout" },
    { label: "Plan a Road Trip", value: "plan_road_trip" },
    { label: "Organize Photos", value: "organize_photos" },
    { label: "Clear Browser History", value: "clear_browser_history" },
    { label: "Research Vacation Spots", value: "research_vacation" },
    { label: "Make an Appointment", value: "make_appointment" },
    { label: "Check for Updates", value: "check_for_updates" },
    { label: "Unfollow Social Media Accounts", value: "unfollow_social_media" },
    { label: "Cancel Subscription", value: "cancel_subscription" },
    { label: "Set Alarm", value: "set_alarm" },
    { label: "Plan a Surprise", value: "plan_surprise" },
    { label: "Buy a New Phone", value: "buy_new_phone" },
    { label: "Start a Blog", value: "start_blog" },
    { label: "Apply for Jobs", value: "apply_for_jobs" },
    { label: "Check Reviews", value: "check_reviews" },
    { label: "Fix Broken Furniture", value: "fix_broken_furniture" },
    { label: "Join Fitness Class", value: "join_fitness_class" },
    { label: "Check Health Insurance", value: "check_health_insurance" },
    { label: "Attend Networking Event", value: "attend_networking_event" },
    { label: "Pick Up Prescription", value: "pick_up_prescription" },
    { label: "Go Grocery Shopping", value: "go_grocery_shopping" },
    { label: "Wash Car", value: "wash_car" },
    { label: "Renew Subscription", value: "renew_subscription" },
    { label: "Attend Workshop", value: "attend_workshop" },
    { label: "Donate Blood", value: "donate_blood" },
    { label: "Review Budget", value: "review_budget" },
    { label: "Try New Recipe", value: "try_new_recipe" },
    { label: "Practice Music", value: "practice_music" },
    { label: "Track Fitness Progress", value: "track_fitness_progress" },
    { label: "Get Passport", value: "get_passport" },
    { label: "Book Doctor Appointment", value: "book_doctor_appointment" },
    { label: "Book Massage Appointment", value: "book_massage_appointment" },
    { label: "Clean Refrigerator", value: "clean_refrigerator" },
    { label: "Clean Bathroom", value: "clean_bathroom" },
    { label: "Prepare for Meeting", value: "prepare_for_meeting" },
    { label: "Rearrange Furniture", value: "rearrange_furniture" },
    { label: "Take Out Trash", value: "take_out_trash" },
    { label: "Buy Flowers", value: "buy_flowers" },
    { label: "Check Wi-Fi Settings", value: "check_wifi_settings" },
    { label: "Start Meditation", value: "start_meditation" },
    { label: "Write a Letter", value: "write_letter" },
    { label: "Go to the Library", value: "go_to_library" },
    { label: "Set Up Smart Home", value: "set_up_smart_home" },
    { label: "Buy Furniture", value: "buy_furniture" },
    { label: "Clean Air Conditioner", value: "clean_air_conditioner" },
    { label: "Organize Closet", value: "organize_closet" },
    { label: "Change Oil in Car", value: "change_oil_in_car" },
    { label: "Prepare for Holiday", value: "prepare_for_holiday" },
    { label: "Fix Broken Door", value: "fix_broken_door" },
    { label: "Check Credit Score", value: "check_credit_score" },
    { label: "Create a Mind Map", value: "create_mind_map" },
    { label: "Update LinkedIn Profile", value: "update_linkedin_profile" },
    { label: "Order New Shoes", value: "order_new_shoes" },
    { label: "Take a Break", value: "take_a_break" },
    { label: "Do Yoga", value: "do_yoga" },
    { label: "Study for Exam", value: "study_for_exam" },
    { label: "Organize Bookshelf", value: "organize_bookshelf" },
    { label: "Make a Vision Board", value: "make_vision_board" },
    {
      label: "Create a Budget Spreadsheet",
      value: "create_budget_spreadsheet",
    },
    { label: "Test New Recipe", value: "test_new_recipe" },
    { label: "Find New Hobbies", value: "find_new_hobbies" },
    { label: "Apply to College", value: "apply_to_college" },
    { label: "Learn a New Language", value: "learn_new_language" },
    { label: "Unbox New Items", value: "unbox_new_items" },
    { label: "Change Profile Picture", value: "change_profile_picture" },
    { label: "Check Online Orders", value: "check_online_orders" },
    { label: "Plan New Year Goals", value: "plan_new_year_goals" },
    { label: "Join Book Club", value: "join_book_club" },
    { label: "Install New Apps", value: "install_new_apps" },
    { label: "Write a Blog Post", value: "write_blog_post" },
    { label: "Create a Bucket List", value: "create_bucket_list" },
    { label: "Clean Fireplace", value: "clean_fireplace" },
    { label: "Review Subscription Plan", value: "review_subscription_plan" },
    { label: "Visit a New Place", value: "visit_new_place" },
    { label: "Fix Phone Screen", value: "fix_phone_screen" },
    { label: "Change Batteries", value: "change_batteries" },
    { label: "Clean Air Filter", value: "clean_air_filter" },
    { label: "Pack for Vacation", value: "pack_for_vacation" },
    { label: "Join a Volunteer Program", value: "join_volunteer_program" },
    { label: "Try New Exercise", value: "try_new_exercise" },
    { label: "Learn to Cook", value: "learn_to_cook" },
    { label: "Decorate House", value: "decorate_house" },
    { label: "Create a Travel Itinerary", value: "create_travel_itinerary" },
    { label: "Go to a Concert", value: "go_to_concert" },
    { label: "Start a YouTube Channel", value: "start_youtube_channel" },
    { label: "Attend a Networking Event", value: "attend_networking_event" },
    { label: "Fix Broken Appliances", value: "fix_broken_appliances" },
    { label: "Go on a Date", value: "go_on_date" },
    { label: "Plan Family Vacation", value: "plan_family_vacation" },
    { label: "Take Photos", value: "take_photos" },
    { label: "Review Personal Goals", value: "review_personal_goals" },
  ];

  const checkIfTheFieldsAreFilled = () => {
    if (!todoType && step === 1) {
      setError({ ...error, todoType: true });
      return;
    }
    if (!dueDate && step === 2) {
      setError({ ...error, dueDate: true });
      return;
    }
    if (!priority && step === 3) {
      setError({ ...error, priority: true });
      return;
    }
    if (!todoMessage && step === 4) {
      setError({ ...error, todoMessage: true });
      return;
    }

    return 1;
  };

  const handleNext = () => {
    if (checkIfTheFieldsAreFilled() === 1) setStep((prevStep) => prevStep + 1);
  };
  const handleBack = () => setStep((prevStep) => prevStep - 1);

  const resetModalData = () => {
    setStep(1);
    setTodoType("");
    setDueDate(new Date());
    setPriority("Moderate");
    setTodoMessage("");
  };

  return (
    isOpen && (
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 ${
          isDarkMode ? "bg-gray-900 bg-opacity-80" : "bg-gray-500 bg-opacity-50"
        }`}
      >
        <div
          className={`p-6 relative rounded-lg shadow-lg w-11/12 max-w-md ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
          }`}
        >
          {/* Close Button */}
          <button
            onClick={() => {
              onClose();
              resetModalData();
            }}
            className={`absolute top-3 right-3 text-xl bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700 transition duration-200`}
          >
            &times;
          </button>

          {/* Step 1: Select Type */}
          {step === 1 && (
            <>
              <h2 className="text-2xl font-semibold mb-4">Select To do Type</h2>
              {error.todoType && (
                <p className="text-red-500 my-2">* todo type is required</p>
              )}
              {/* <select
                value={todoType}
                onChange={(e) => {
                  setTodoType(e.target.value);
                  if (e.target.value) setError({ ...error, todoType: false });
                  else setError({ ...error, todoType: true });
                }}
                className={`w-full p-3 rounded-lg ${
                  isDarkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-gray-200 text-gray-800 border-gray-300"
                }`}
              >
                <option value="" disabled>
                  Select Type
                </option>
                <option value="personal">Personal</option>
                <option value="diet">Diet</option>
                <option value="work">Work</option>
                <option value="exercise">Exercise</option>
              </select> */}
              <Select
                options={options}
                defaultValue={todoType}
                onChange={setTodoType}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    backgroundColor: isDarkMode ? "#2D3748" : "#EDF2F7", // Dark: #2D3748, Light: #EDF2F7
                    color: isDarkMode ? "#fff" : "#2D3748", // Text color inside the control
                    borderColor: isDarkMode ? "#4A5568" : "#E2E8F0", // Border color based on the mode
                    "&:hover": {
                      borderColor: isDarkMode ? "#A0AEC0" : "#CBD5E0", // Lighter border color on hover
                    },
                    borderRadius: "8px", // Rounded corners
                    padding: "0.5rem", // Padding
                  }),
                  menu: (provided) => ({
                    ...provided,
                    backgroundColor: isDarkMode ? "#2D3748" : "#fff", // Menu background color based on mode
                    color: isDarkMode ? "#fff" : "#2D3748", // Text color in the dropdown menu
                    borderRadius: "8px", // Rounded corners
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Optional: shadow for dropdown
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected
                      ? isDarkMode
                        ? "#4A5568" // Dark mode selected option color
                        : "#E2E8F0" // Light mode selected option color
                      : state.isFocused
                      ? isDarkMode
                        ? "#4A5568" // Dark mode focused option color
                        : "#E2E8F0" // Light mode focused option color
                      : isDarkMode
                      ? "#2D3748" // Dark mode option color
                      : "#EDF2F7", // Light mode option color
                    color:
                      state.isSelected || state.isFocused
                        ? "#fff" // Selected or focused option text color
                        : isDarkMode
                        ? "#fff" // Default text color for dark mode options
                        : "#2D3748", // Default text color for light mode options
                    padding: "8px 12px", // Option padding
                    borderRadius: "8px", // Rounded corners
                    cursor: "pointer", // Cursor pointer on hover
                  }),
                  dropdownIndicator: (provided) => ({
                    ...provided,
                    color: isDarkMode ? "#fff" : "#000", // Color of the dropdown indicator (arrow)
                  }),
                  indicatorSeparator: (provided) => ({
                    ...provided,
                    backgroundColor: isDarkMode ? "#4A5568" : "#E2E8F0", // Separator color
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    color: isDarkMode ? "#fff" : "#2D3748", // Color of the selected value (text in the input)
                  }),
                  input: (provided) => ({
                    ...provided,
                    color: isDarkMode ? "#fff" : "#2D3748", // Input text color when typing
                  }),
                  placeholder: (provided) => ({
                    ...provided,
                    color: isDarkMode ? "#A0AEC0" : "#A0AEC0", // Placeholder text color (same for both modes)
                  }),
                }}
              />

              <div className="mt-6 flex justify-end space-x-2">
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-200"
                >
                  Next
                </button>
              </div>
            </>
          )}

          {/* Step 2: Select Due Date */}
          {step === 2 && (
            <>
              <h2 className="text-2xl font-semibold mb-4">
                Select Due Date & Time
              </h2>
              {error.dueDate && (
                <p className="text-red-500 my-2">
                  * due date & time is required
                </p>
              )}
              <div className="w-full flex justify-stretch">
                <DatePicker
                  selected={dueDate}
                  onChange={(date) => {
                    if (date) setError({ ...error, dueDate: false });
                    else setError({ ...error, dueDate: true });
                    setDueDate(date);
                  }}
                  className={`w-full p-3 rounded-lg ${
                    isDarkMode
                      ? "bg-gray-700 text-white border-gray-600"
                      : "bg-gray-200 text-gray-800 border-gray-300"
                  }`}
                  placeholderText="Select Date"
                  dateFormat="MMMM d, yyyy"
                  showTimeSelect
                  timeIntervals={30}
                />
              </div>
              <div className="mt-6 flex justify-between">
                <button
                  onClick={handleBack}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg shadow hover:bg-gray-500 transition duration-200"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-200"
                >
                  Next
                </button>
              </div>
            </>
          )}

          {/* Step 3: Select Priority */}
          {step === 3 && (
            <>
              <h2 className="text-2xl font-semibold mb-4">Select Priority</h2>
              {error.priority && (
                <p className="text-red-500 my-2">* priority is required</p>
              )}
              <div className="flex flex-col space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="priority"
                    value="High"
                    checked={priority === "High"}
                    onChange={(e) => setPriority(e.target.value)}
                    className="mr-2"
                  />
                  High
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="priority"
                    value="Moderate"
                    checked={priority === "Moderate"}
                    onChange={(e) => setPriority(e.target.value)}
                    className="mr-2"
                  />
                  Moderate
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="priority"
                    value="Low"
                    checked={priority === "Low"}
                    onChange={(e) => setPriority(e.target.value)}
                    className="mr-2"
                  />
                  Low
                </label>
              </div>
              <div className="mt-6 flex justify-between">
                <button
                  onClick={handleBack}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg shadow hover:bg-gray-500 transition duration-200"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-200"
                >
                  Next
                </button>
              </div>
            </>
          )}

          {/* Step 4: Enter Todo Message */}
          {step === 4 && (
            <>
              <h2 className="text-2xl font-semibold mb-4">
                Enter Todo Message
              </h2>
              {error.todoMessage && (
                <p className="text-red-500 my-2">* todo message is required</p>
              )}
              <textarea
                value={todoMessage}
                onChange={(e) => {
                  setTodoMessage(e.target.value);
                  if (e.target.value)
                    setError({ ...error, todoMessage: false });
                  else setError({ ...error, todoMessage: true });
                }}
                placeholder="Type your todo here..."
                className={`w-full p-3 h-24 rounded-lg resize-none ${
                  isDarkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-gray-200 text-gray-800 border-gray-300"
                }`}
              />
              <div className="mt-6 flex justify-between">
                <button
                  onClick={handleBack}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg shadow hover:bg-gray-500 transition duration-200"
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    // Save logic goes here
                    if (!todoMessage) {
                      setError({ ...error, todoMessage: true });
                      return;
                    }
                    dispatch(
                      addTask({
                        todoType: todoType.value,
                        dueDate,
                        priority,
                        todoMessage,
                      })
                    );
                    resetModalData();
                    onClose();
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition duration-200"
                >
                  Save
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    )
  );
};

export default TodoModal;
