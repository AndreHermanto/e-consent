**🛑 Dev and Prod setup instructions are a level up 🛑**

# Participant Backend
Participant backend does 4 things:

1. Serve the built frontend files
2. Validate the user input and pass to NSWHP and Wolper services
3. Add a layer of indirection to NSWHP and Wolper services
4. Generate the PDF after submission

As such, there is no database, schema, etc. Additionally, ensure there is permission for it to write files, since the PDF generation requires intermediary files to be written.

## Tests

Some tests are included in `__tests__`. These test it's ability to submit information to NSWHP and Wolper services, as well as reject invalid input. They can be run with `npm -s test`, and require the other services to be running first. They are also automatically ran on production build.
