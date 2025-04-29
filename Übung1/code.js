// Das Beispielexperiment erzeugt als Fragen nur die Zahlen 0-9.
// Ein Experimentteilnehmer kann die Zahlen 1-3 drücken
//
// Die Experimentdefinition erfolgt über Aufruf der Funktion
//  - document.experiment_definition(...)
// Falls eine Zufallszahl benötigt wird, erhält man sie durch den Methodenaufruf
//  - document.new_random_integer(...Obergrenze...);
//
// WICHTIG: Man sollte new_random_integer nur innerhalb  der Lambda-Funktion ausführen, also NICHT
// an einer anderen Stelle, damit man ein reproduzierbares Experiment erhält!

function random_int() {
    return document.new_random_integer(10);
}

function random_bool() {
    return document.new_random_integer(2) > 0;
}

// Das hier ist die eigentliche Experimentdefinition
document.experiment_definition(
    {
        experiment_name:"Stefan First Trial",
        seed:"42",
        introduction_pages:["Interessiert mich nicht.\n\nPress [Enter] to continue."],
        pre_run_instruction:"Gleich gehts los.\n\nWhen you press [Enter] the tasks directly start.",
        finish_pages:["Thanks for nothing. When you press [Enter], the experiment's data will be downloaded."],
        layout:[
            {variable:"AVariable",treatments:["A", "B"]}
        ],
        repetitions:4,                    // Anzahl der Wiederholungen pro Treatmentcombination
        accepted_responses:["0", "1","2","3", "4", "5", "6", "7", "8", "9"], // Tasten, die vom Experiment als Eingabe akzeptiert werden
        task_configuration: (t) => {
            // Das hier ist der Code, der jeder Task im Experiment den Code zuweist.

            if (t.treatment_combination[0].value == "A") {
                // Treatment A Logik
                let totalConditions = random_int();
                let codeLines = [];

                let x = (totalConditions * 3 + random_int()) % 10;
                let y = (totalConditions + random_int() * 2) % 10;

                codeLines.push("public class Example {");
                codeLines.push("    public static void main(String[] args) {");
                codeLines.push(`        int x = ${x};`);
                codeLines.push(`        int y = ${y};`);
                codeLines.push("        int z = x + y;");

                for (let i = 0; i < totalConditions; i++) {
                    let rnd = random_int();
                    if (rnd < 3) {
                        codeLines.push("        if (z > 0) {");
                        codeLines.push("            System.out.println(\"if block\");");
                        codeLines.push("        }");
                    } else if (rnd < 6) {
                        codeLines.push("        else if (z > 1) {");
                        codeLines.push("            System.out.println(\"else-if block\");");
                        codeLines.push("        }");
                    } else {
                        codeLines.push("        else {");
                        codeLines.push("            System.out.println(\"else block\");");
                        codeLines.push("        }");
                    }
                }

                codeLines.push("    }");
                codeLines.push("}");

                t.code = codeLines.join("\n");
                t.expected_answer = "" + totalConditions;
            }
            else {
                // Treatment B Logik (aktuell gleich wie A)
                let totalConditions = random_int();
                let codeLines = [];

                let x = (totalConditions * 3 + random_int()) % 10;
                let y = (totalConditions + random_int() * 2) % 10;

                codeLines.push("public class Example {");
                codeLines.push("    public static void main(String[] args) {");
                codeLines.push(`        int x = ${x};`);
                codeLines.push(`        int y = ${y};`);
                codeLines.push("        int z = x + y;");

                for (let i = 0; i < totalConditions; i++) {
                    let rnd = random_int();
                    if (rnd < 3) {
                        codeLines.push("        if (z > 0) {");
                        codeLines.push("            System.out.println(\"if block\");");
                        codeLines.push("        }");
                    } else if (rnd < 6) {
                        codeLines.push("        else if (z > 1) {");
                        codeLines.push("            System.out.println(\"else-if block\");");
                        codeLines.push("        }");
                    } else {
                        codeLines.push("        else {");
                        codeLines.push("            System.out.println(\"else block\");");
                        codeLines.push("        }");
                    }
                }

                codeLines.push("    }");
                codeLines.push("}");

                t.code = codeLines.join("\n");
                t.expected_answer = "" + totalConditions;
            }

            t.after_task_string = () => "Enter drücken, um mit der nächsten Frage fortzufahren!";
        }
    }
);
