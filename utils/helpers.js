module.exports = { 

    format_date: (date) => {
        // We use the 'toLocaleTimeString()' method to format the time as H:MM:SS AM/PM
        return date.toDateString();
      }

   };