/**
 * Config + starter code for the code playground. Add a language by adding
 * a key here (with a Wandbox compiler id from https://wandbox.org/api/list.json)
 * — playground.js builds the dropdown and wiring from this automatically.
 */
window.QA_PLAYGROUND_DATA = {
  endpoint: "https://wandbox.org/api/compile.json",

  languages: {
    python: {
      label: "Python",
      compiler: "cpython-3.12.7",
      starter:
        'print("Hello, QA!")\n\n' +
        "# Try writing a small function and testing it below.\n" +
        "def is_even(n):\n" +
        "    return n % 2 == 0\n\n" +
        "print(is_even(4), is_even(7))\n"
    },
    java: {
      label: "Java",
      compiler: "openjdk-jdk-21+35",
      starter:
        "// Tip: keep the class named Main, without the \"public\" keyword —\n" +
        "// that's what lets this run on the online compiler behind this page.\n" +
        "class Main {\n" +
        "    public static void main(String[] args) {\n" +
        '        System.out.println("Hello, QA!");\n' +
        "        System.out.println(isEven(4) + \" \" + isEven(7));\n" +
        "    }\n\n" +
        "    static boolean isEven(int n) {\n" +
        "        return n % 2 == 0;\n" +
        "    }\n" +
        "}\n"
    }
  }
};
