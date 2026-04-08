#include <iostream>
using namespace std;

int main() {
    float hours[7], sum = 0;
    cout << "Enter study hours for 7 days:\n";
    for (int i = 0; i < 7; i++) {
        cin >> hours[i];
        sum += hours[i];
    }
    float avg = sum / 7;
    cout << "Total: " << sum << endl;
    cout << "Average: " << avg << endl;
    if (avg < 3) {
        cout << "Warning: Low study average!";
    }
    return 0;
}