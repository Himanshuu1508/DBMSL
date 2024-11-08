import java.sql.*;
import java.util.Scanner;

public class StudentManagement {
    private static final String DATABASE_URL = "jdbc:mysql://localhost:3306/mydb";
    private static final String USERNAME = "root";
    private static final String PASSWORD = "radhamadangopal";
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        try (Connection connection = DriverManager.getConnection(DATABASE_URL, USERNAME, PASSWORD)) {
            System.out.println("Connected to the database.");

            while (true) {
                System.out.println("\n--- Student Management System ---");
                System.out.println("1. Add Student");
                System.out.println("2. Update Student");
                System.out.println("3. Delete Student");
                System.out.println("4. View All Students");
                System.out.println("5. Exit");
                System.out.print("Choose an option: ");
                int choice = scanner.nextInt();
                scanner.nextLine(); // Consume newline

                switch (choice) {
                    case 1:
                        addStudent(connection, scanner);
                        break;
                    case 2:
                        updateStudent(connection, scanner);
                        break;
                    case 3:
                        deleteStudent(connection, scanner);
                        break;
                    case 4:
                        viewAllStudents(connection);
                        break;
                    case 5:
                        System.out.println("Exiting...");
                        return;
                    default:
                        System.out.println("Invalid choice! Please try again.");
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private static void addStudent(Connection connection, Scanner scanner) {
        System.out.print("Enter Roll No: ");
        String rollNo = scanner.nextLine();
        System.out.print("Enter Name: ");
        String name = scanner.nextLine();
        System.out.print("Enter Marks: ");
        int marks = scanner.nextInt();
        scanner.nextLine(); // Consume newline
        System.out.print("Enter Class: ");
        String studentClass = scanner.nextLine();

        String sql = "INSERT INTO student (roll_no, name, marks, class) VALUES (?, ?, ?, ?)";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, rollNo);
            statement.setString(2, name);
            statement.setInt(3, marks);
            statement.setString(4, studentClass);
            statement.executeUpdate();
            System.out.println("Student added successfully!");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private static void updateStudent(Connection connection, Scanner scanner) {
        System.out.print("Enter Roll No of the student to update: ");
        String rollNo = scanner.nextLine();

        String sql = "UPDATE student SET name=?, marks=?, class=? WHERE roll_no=?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            System.out.print("Enter new Name: ");
            String name = scanner.nextLine();
            System.out.print("Enter new Marks: ");
            int marks = scanner.nextInt();
            scanner.nextLine(); // Consume newline
            System.out.print("Enter new Class: ");
            String studentClass = scanner.nextLine();

            statement.setString(1, name);
            statement.setInt(2, marks);
            statement.setString(3, studentClass);
            statement.setString(4, rollNo);

            int rowsUpdated = statement.executeUpdate();
            if (rowsUpdated > 0) {
                System.out.println("Student updated successfully!");
            } else {
                System.out.println("No student found with that Roll No.");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private static void deleteStudent(Connection connection, Scanner scanner) {
        System.out.print("Enter Roll No of the student to delete: ");
        String rollNo = scanner.nextLine();

        String sql = "DELETE FROM student WHERE roll_no=?";
        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, rollNo);
            int rowsDeleted = statement.executeUpdate();
            if (rowsDeleted > 0) {
                System.out.println("Student deleted successfully!");
            } else {
                System.out.println("No student found with that Roll No.");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private static void viewAllStudents(Connection connection) {
        String sql = "SELECT * FROM student";

        try (Statement statement = connection.createStatement(); ResultSet resultSet = statement.executeQuery(sql)) {
            while (resultSet.next()) {
                String rollNo = resultSet.getString("roll_no");
                String name = resultSet.getString("name");
                int marks = resultSet.getInt("marks");
                String studentClass = resultSet.getString("class");

                System.out.printf("Roll No: %s | Name: %s | Marks: %d | Class: %s%n", rollNo, name, marks, studentClass);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
